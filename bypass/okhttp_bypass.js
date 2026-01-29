/*
 * OkHttp TLS Pinning Bypass
 *
 * This script disables certificate pinning implemented via OkHttp.
 * It is commonly required when Flutter apps use native Android SDKs
 * or third-party libraries that rely on OkHttp.
 *
 * Intended for authorized security testing only.
 */

'use strict';

if (!Java.available) {
    console.log('[!] Java environment not available');
    return;
}

Java.perform(() => {
    try {
        const Builder = Java.use('okhttp3.OkHttpClient$Builder');

        Builder.sslSocketFactory.overload(
            'javax.net.ssl.SSLSocketFactory',
            'javax.net.ssl.X509TrustManager'
        ).implementation = function (sslSocketFactory, trustManager) {
            console.log('[+] OkHttp SSL pinning bypassed');
            return this.sslSocketFactory(sslSocketFactory, trustManager);
        };
    } catch (e) {
        console.log('[!] OkHttp not found (skipping)');
    }
});
