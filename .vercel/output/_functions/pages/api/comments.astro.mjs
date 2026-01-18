import { g as generateCommentId, P as PRESET_NAMES } from '../../chunks/comment_4-NVpF0F.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || "your-username/your-repo";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
function sanitize(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").trim();
}
function validateInput(body) {
  if (!body.postSlug || typeof body.postSlug !== "string") {
    return { valid: false, error: "Invalid post slug" };
  }
  if (!body.author || typeof body.author !== "string") {
    return { valid: false, error: "Name is required" };
  }
  if (body.author.length > 30) {
    return { valid: false, error: "Name too long (max 30 characters)" };
  }
  if (!body.content || typeof body.content !== "string") {
    return { valid: false, error: "Comment is required" };
  }
  if (body.content.length > 1e3) {
    return { valid: false, error: "Comment too long (max 1000 characters)" };
  }
  if (body.content.length < 2) {
    return { valid: false, error: "Comment too short" };
  }
  if (body.isPresetName && !PRESET_NAMES.includes(body.author)) {
    return { valid: false, error: "Invalid preset name" };
  }
  return { valid: true };
}
async function getExistingComments(postSlug) {
  const filePath = `src/data/comments/pending/${postSlug}.json`;
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          "Authorization": `Bearer ${GITHUB_TOKEN}`,
          "Accept": "application/vnd.github.v3+json"
        }
      }
    );
    if (response.ok) {
      const data = await response.json();
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      const parsed = JSON.parse(content);
      return { comments: parsed.comments || [], sha: data.sha };
    }
  } catch {
  }
  return { comments: [] };
}
async function saveComments(postSlug, comments, sha) {
  const filePath = `src/data/comments/pending/${postSlug}.json`;
  const fileContent = {
    postSlug,
    comments
  };
  const body = {
    message: `Add pending comment for ${postSlug}`,
    // Use Buffer for Node.js compatibility
    content: Buffer.from(JSON.stringify(fileContent, null, 2)).toString("base64"),
    branch: GITHUB_BRANCH
  };
  if (sha) {
    body.sha = sha;
  }
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${GITHUB_TOKEN}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("GitHub API error:", response.status, errorData);
      return { ok: false, error: `GitHub API: ${response.status} - ${errorData.message || "Unknown error"}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("GitHub fetch error:", err);
    return { ok: false, error: `Fetch error: ${err}` };
  }
}
const POST = async ({ request }) => {
  if (!GITHUB_TOKEN) {
    return new Response(
      JSON.stringify({ success: false, error: "Server configuration error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const body = await request.json();
    const validation = validateInput(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ success: false, error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const comment = {
      id: generateCommentId(),
      author: sanitize(body.author),
      content: sanitize(body.content),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      isPresetName: Boolean(body.isPresetName)
    };
    const { comments, sha } = await getExistingComments(body.postSlug);
    comments.push(comment);
    const result = await saveComments(body.postSlug, comments, sha);
    if (!result.ok) {
      return new Response(
        JSON.stringify({ success: false, error: result.error || "Failed to save comment" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ success: true, message: "Comment submitted for moderation" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Comment submission error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to process comment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
