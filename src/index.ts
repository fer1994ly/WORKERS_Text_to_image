export default {
  async fetch(request, env) {
    // Default prompt
    let prompt = "cyberpunk cat";
    
    // Get URL to check for query parameters
    const url = new URL(request.url);
    const queryPrompt = url.searchParams.get('prompt');
    
    if (queryPrompt) {
      // Use the prompt from query parameters
      prompt = queryPrompt;
    } else if (request.method === 'POST') {
      // Try to get prompt from JSON body
      try {
        const body = await request.json();
        if (body.prompt) {
          prompt = body.prompt;
        }
      } catch (e) {
        // If parsing fails, continue with default prompt
      }
    }

    const inputs = {
      prompt: prompt,
    };

    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs,
    );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
};
