# cloudflare-doh-proxy

## Description
A lightweight Cloudflare Workers DNS over HTTPS proxy that forwards DNS queries to Cloudflare DNS and returns DNS responses in application/dns-message format. Designed for personal use, quick testing, and small teams that want encrypted DNS resolution at the edge without running a full resolver.

## Features
- Forwards DoH GET and POST requests to Cloudflare DNS endpoint  
- Returns raw DNS wire format with correct Content-Type headers  
- CORS enabled for browser clients  
- Minimal, dependency-free Worker script for low latency and low resource usage  
- Deployable with Wrangler or the Cloudflare Dashboard

## Quickstart
1. Clone this repository and save your Worker script as `index.js`.  
2. Add a `wrangler.toml` with your Worker name and compatibility date.  
3. Authenticate with Cloudflare: `wrangler login`.  
4. Publish: `wrangler publish`.  
5. Set your DoH template URL to `https://<your-worker>.workers.dev/dns-query` in your OS or DoH client.

## Usage Examples
- Windows 11 DoH template: `https://<your-worker>.workers.dev/dns-query`  
- Browser DoH client: send `GET` with base64url `dns` param or `POST` with `application/dns-message` body  
- Test with curl:  
  - POST: `curl -X POST -H "Content-Type: application/dns-message" --data-binary @query.bin https://<your-worker>.workers.dev/dns-query`  
  - GET: `curl "https://<your-worker>.workers.dev/dns-query?dns=<base64url>"`

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

