$(document).ready(function () {
    $('#button1').click(function (e) { 
        e.preventDefault();
        let fid1=new FIDO3().register(verification_options).then(function (results) {
            let publicKeyCredential = {
                id: results.id,
                type: results.type,
                rawId: new webAUth_funcs().arraybuffertobase64(results.rawId),
                response: {
                    authenticatorData: new webAUth_funcs().arraybuffertobase64(results.response.authenticatorData),
                    signature: new webAUth_funcs().arraybuffertobase64(results.response.signature),
                    userHandle: new webAUth_funcs().arraybuffertobase64(results.response.userHandle),
                    clientDataJSON: new webAUth_funcs().arraybuffertobase64(results.response.clientDataJSON),
                }
            };
            let r1=new APICALLS2().post_Challenge_response_data(publicKeyCredential).then(function (data) {
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            });
        }).catch(function (err) {
            console.log(err);
        });        
    });
});
class APICALLS2{
    async post_Challenge_response_data(data){
        let r1= await $.ajax({
            url: "/verify",
            type: "POST",
            crossDomain: true,
            withCredentials: true,
            data:JSON.stringify(data),
            contentType:"application/json",
            success: function (data) {
                console.log(data);
                return data;
            },
            error: function (error) {
                console.log(error);
            }
        });
        return r1;
    }
}

class webAUth_funcs{
    strtoarraybuffer(stringer){
    let arraybuffer=new ArrayBuffer(stringer.length);
    let unit8array=new Uint8Array(arraybuffer);
    for (let i = 0; i < stringer.length; i++) {
        unit8array[i]=stringer.charCodeAt(i);
    }
    return arraybuffer;
}
     arraybuffertobase64(arraybuffer){
    let base64str=btoa(String.fromCharCode.apply(null, new Uint8Array(arraybuffer)));
    base64str=base64str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return base64str;
}
    strbase64toarraybuffer(stringer){
    let base64str=stringer.replace(/-/g, '+').replace(/_/g, '/');
    let arraybuffer=atob(base64str);
    let unit8array=new Uint8Array(arraybuffer.length);
    for (let i = 0; i < arraybuffer.length; i++) {
        unit8array[i]=arraybuffer.charCodeAt(i);
    }
    return unit8array.buffer;
    }
}

class FIDO3{
    async register(publicKey){
        publicKey['challenge']=strtoarraybuffer(publicKey['challenge']);
        publicKey['allowCredentials'][0]['id']=new webAUth_funcs().strbase64toarraybuffer(publicKey['allowCredentials'][0]['id']);  
        const credential = await navigator.credentials.get({ publicKey });
        return credential;
    }
}
