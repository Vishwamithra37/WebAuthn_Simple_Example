$(document).ready(function () {
    
console.log("gomu2.js loaded");
async function register() {
    // Define the challenge
    const challenge = new TextEncoder().encode(challenge2);
    console.log(challenge);
  
    // Define the parameters for the public key
    const publicKey = {
        challenge,
        rp: { name: "Example RP" },
        user: {
          id: new Uint8Array(16),
          name: "example@example.com",
          displayName: "Example User"
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },
          // { type: "public-key", alg: -35 },
          // { type: "public-key", alg: -36 },
        ],
        timeout: 60000,
        attestation: "direct",
        authenticatorSelection: {
          requireResidentKey: false,
          userVerification: "preferred"
        }
      };
      console.log(publicKey);


    // Call navigator.credentials.create()
    const credential = await navigator.credentials.create({ publicKey });
    return credential
  }

  $('#button2').click(function () {
    let b1=register().then(function (credential) {
          
    // Send the credential to the server
     async function sendCredentialToServer(credential) {
        let r1=await $.ajax({
            url: "/register",
            type: "POST",
            data: JSON.stringify(credential),
            contentType: "application/json",
            dataType: "json"
        });
        return r1;
    }
    sendCredentialToServer(credential).then(function (result) {
    
      // Log the result
      console.log("Registration result:", result);
    }).catch(function (err) {
        console.log(err);
        });
    }).catch(function (err) {
        console.log(err);
        });
    
  });
});


$(document).ready(function () {

});