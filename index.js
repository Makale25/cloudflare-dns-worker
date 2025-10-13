
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        //if (path !== '/dns-query') {
        //    return new Response('Not Found', {
        //        status: 404,
        //        headers: { 'Access-Control-Allow-Origin': '*' }
        //    });
        //}

        let dnsRequest;

        if (request.method === 'POST') {
            const contentType = request.headers.get('content-type') || '';
            if (!contentType.includes('application/dns-message')) {
                return new Response('Unsupported Media Type', {
                    status: 415,
                    headers: { 'Access-Control-Allow-Origin': '*' }
                });
            }
            dnsRequest = await request.arrayBuffer();
        } else if (request.method === 'GET') {
            const dnsParam = url.searchParams.get('dns');
            if (!dnsParam) {
                return new Response('Missing dns query', {
                    status: 400,
                    headers: { 'Access-Control-Allow-Origin': '*' }
                });
            }
            dnsRequest = Uint8Array.from(atob(dnsParam.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)).buffer;
        } else {
            return new Response('Method Not Allowed', {
                status: 405,
                headers: { 'Access-Control-Allow-Origin': '*' }
            });
        }

        const response = await fetch('https://cloudflare-dns.com/dns-query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/dns-message',
                'Accept': 'application/dns-message',
            },
            body: dnsRequest
        });

        const dnsResponse = await response.arrayBuffer();

        return new Response(dnsResponse, {
            status: 200,
            headers: {
                'Content-Type': 'application/dns-message',
                'Access-Control-Allow-Origin': '*',
                'Content-Length': dnsResponse.byteLength.toString()
            }
        });
    }
}