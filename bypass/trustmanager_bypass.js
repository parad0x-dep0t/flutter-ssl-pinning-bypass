/*
 * Android TrustManager TLS Pinning Bypass
 *
 * This script replaces the default X509TrustManager with a permissive
 * implementation that trusts all certificates.
 *
 * Acts as a generic fallback for apps implementing custom TLS pinning.
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
        const X509TrustManager = Java.use('javax.net.ssl.X509TrustManager');

        const TrustManager = Java.registerClass({
            name: 'com.frida.PermissiveTrustManager',
            implements: [X509TrustManager],
            methods: {
                checkClientTrusted: function () {},
                checkServerTrusted: function () {},
                getAcceptedIssuers: function () {
                    return [];
                }
            }
        });

        const SSLContext = Java.use('javax.net.ssl.SSLContext');

        SSLContext.init.overload(
            '[Ljavax.net.ssl.KeyManager;',
            '[Ljavax.net.ssl.TrustManager;',
            'java.security.SecureRandom'
        ).implementation = function (km, tm, sr) {
            console.log('[+] TrustManager pinning bypassed');
            return this.init(km, [TrustManager.$new()], sr);
        };

    } catch (e) {
        console.log('[!] TrustManager bypass failed:', e);
    }
});
