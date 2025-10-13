# cloudflare-doh-proxy

## Description
A lightweight Cloudflare Workers DNS over HTTPS proxy that forwards DNS queries to Cloudflare DNS and returns DNS responses in application/dns-message format. Designed for personal use, quick testing, and small teams that want encrypted DNS resolution at the edge without running a full resolver.

## Features
- Forwards DoH GET and POST requests to Cloudflare DNS endpoint  
- Returns raw DNS wire format with correct Content-Type headers  
- CORS enabled for browser clients  
- Minimal, dependency-free Worker script for low latency and low resource usage  
- Deployable with Wrangler or the Cloudflare Dashboard

## How to use

# How to deploy the Cloudflare DoH Worker from the repository

1. Open Cloudflare dashboard:
   - Go to https://dash.cloudflare.com/
2. Sign in or create an account:
   - Create an account or log in with your existing Cloudflare credentials.
3. Click on Compute (Workers):
   - In the left sidebar click "Compute" then choose "Workers & Pages".
4. Create a new application:
   - On the right side click "Create application".
5. Import a repository:
   - Select "Import a repository" to start by importing an existing Git repository.
6. Choose clone via Git URL:
   - Click "Clone a public repository via Git URL".
7. Paste the repository URL:
   - Use this repo URL: `https://github.com/jalaljaleh/cloudflare-dns-worker`
   - Paste it into the Git URL field and continue.
8. Configure and deploy:
   - Follow the UI prompts to name the application, set any build settings, and confirm.
   - Click "Create" or "Deploy" to start the deployment process.
9. Verify deployment and test:
   - After deployment, note the Worker URL (e.g., `https://<your-worker>.workers.dev/` or `https://<your-worker>.workers.dev/dns-query`)).
   - Test your DoH endpoint:
     - GET example: `https://<your-worker>.workers.dev/dns-query?dns=<base64url>`
     - POST example: POST `application/dns-message` body to `https://<your-worker>.workers.dev/dns-query`
10. Optional: monitor and configure
    - Monitor usage and logs in the Cloudflare dashboard.
    - Add secrets or environment variables in the dashboard if needed.
    - If you want CI/CD, connect the repository to Cloudflare for automatic deploys on push.

Now your DNS over HTTPS proxy is deployed and ready for testing.


## Limitations and Notes
- Intended as a proxy, not a full recursive resolver or a public DNS service.  
- Free Cloudflare Workers quotas apply; monitor usage for heavy or public traffic.  
- Workers cannot proxy arbitrary TCP/UDP or act as a VPN.  
- Consider adding rate limiting, authentication, and logging if exposing publicly or scaling usage.

## License and Contribution
- Include a LICENSE file (MIT recommended) and a CONTRIBUTING guide for issues and pull requests.  
- Security disclosures and sensitive bug reports should be submitted privately to the repository owner.

## Contact
**Email:** jalaljaleh@gmail.com  

