// GitHub OAuth Worker for Decap CMS
// CLIENT_ID and CLIENT_SECRET should be set as environment variables in Cloudflare

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const CLIENT_ID = env.GITHUB_CLIENT_ID;
    const CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;

    if (!CLIENT_ID || !CLIENT_SECRET) {
      return new Response(
        "OAuth not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables.",
        { status: 500 },
      );
    }

    // Handle CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Auth endpoint - redirects to GitHub
    if (url.pathname === "/auth") {
      const redirectUri = `${url.origin}/callback`;
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
      return Response.redirect(authUrl, 302);
    }

    // Callback endpoint - exchanges code for token
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");

      if (!code) {
        return new Response("Missing code parameter", { status: 400 });
      }

      try {
        const tokenResponse = await fetch(
          "https://github.com/login/oauth/access_token",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              code: code,
            }),
          },
        );

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
          return new Response(`Error: ${tokenData.error_description}`, {
            status: 400,
          });
        }

        const token = tokenData.access_token;
        const escapedToken = JSON.stringify(token);
        const html = `<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
  <script>
    (function() {
      var token = ${escapedToken};
      var provider = "github";
      var data = { token: token, provider: provider };
      var successMessage = "authorization:" + provider + ":success:" + JSON.stringify(data);

      window.addEventListener("message", function(e) {
        if (e.data === "authorizing:github" || e.data.indexOf("authorizing:") === 0) {
          sendToken(e.origin);
        }
      }, false);

      function sendToken(origin) {
        var targetOrigin = origin || "*";
        if (window.opener) {
          window.opener.postMessage(successMessage, targetOrigin);
        }
        setTimeout(function() { window.close(); }, 250);
      }

      if (window.opener) {
        window.opener.postMessage("authorizing:github", "*");
      }

      setTimeout(function() {
        if (window.opener) {
          window.opener.postMessage(successMessage, "*");
        }
      }, 100);

      setTimeout(function() {
        window.close();
      }, 500);
    })();
  </script>
</head>
<body>
  <p>Authorizing... Please wait.</p>
</body>
</html>`;

        return new Response(html, {
          headers: { "Content-Type": "text/html" },
        });
      } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    }

    return new Response("Not Found", { status: 404 });
  },
};
