$(document).ready(function () {
    $('#button2').click(function (e) { 
        e.preventDefault();
        let fid1=new FIDO2().register(complex_challenge).then(function (results) {
            let publicKeyCredential = {
                id: results.id,
                type: results.type,
                rawId: arraybuffertobase64(results.rawId),
                response: {
                    clientDataJSON: arraybuffertobase64(results.response.clientDataJSON),
                    attestationObject: arraybuffertobase64(results.response.attestationObject)
                }
            };
            let r1=new APICALLS().post_Challenge_response_data(publicKeyCredential).then(function (data) {
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            });
        }).catch(function (err) {
            console.log(err);
        });
    });

});

class APICALLS{
    async post_Challenge_response_data(data){
        let r1= await $.ajax({
            url: "/register",
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
function strtoarraybuffer(stringer){
    let arraybuffer=new ArrayBuffer(stringer.length);
    let unit8array=new Uint8Array(arraybuffer);
    for (let i = 0; i < stringer.length; i++) {
        unit8array[i]=stringer.charCodeAt(i);
    }
    return arraybuffer;
}


function arraybuffertobase64(arraybuffer){
    let base64str=btoa(String.fromCharCode.apply(null, new Uint8Array(arraybuffer)));
    base64str=base64str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return base64str;
}

class FIDO2{
    async register(publicKey){
        publicKey['challenge']=strtoarraybuffer(publicKey['challenge']);
        publicKey['user']['id']=strtoarraybuffer(publicKey['user']['id']);
        const credential = await navigator.credentials.create({ publicKey });
        return credential;
    }
}