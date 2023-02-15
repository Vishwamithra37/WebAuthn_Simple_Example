from webauthn import (
    generate_authentication_options,
    verify_authentication_response,
    options_to_json,
    base64url_to_bytes,
)
from webauthn.helpers.structs import (
    PublicKeyCredentialDescriptor,
    UserVerificationRequirement,
    AuthenticationCredential,
)
from config import *
import json

################
#
# Examples of using webauthn for authentication ceremonies
#
# Authentication responses are representative of WebAuthn credential responses
# as they would be encoded for transmission from the browser to the RP as JSON. This
# primarily means byte arrays are encoded as Base64URL on the client.
#
################

# Simple Options

def create_options_using_webauthn_for_authentication():
    dac=dab["USER_CREDENTIALS"]
    cred_id=dac.find_one({"email":"mithravishwa37@gmail.com"})["credential_id"]
    simple_authentication_options = generate_authentication_options(   
    rp_id="localhost",
    challenge=b"asdjkhdfa65as8df4",    
    allow_credentials=[PublicKeyCredentialDescriptor(
        id=cred_id,
        type="public-key",
        transports=["internal"],
        )],
    )
    simple_authentication_options=options_to_json(simple_authentication_options)
    challenger=json.loads(simple_authentication_options)["challenge"]

    print(challenger)
    return simple_authentication_options

def authentication_verification(response_json_object):
    dac=dab["USER_CREDENTIALS"]
    user_pub_key=dac.find_one({"email":"mithravishwa37@gmail.com"})["public_key"]
    authentication_verification = verify_authentication_response(
    credential=AuthenticationCredential.parse_raw(json.dumps(response_json_object)),
    expected_challenge=b"YXNkamtoZGZhNjVhczhkZjQ",
    expected_origin="http://localhost:8001",
    expected_rp_id="localhost",
    credential_current_sign_count=0,
    credential_public_key=user_pub_key,
    )
    print(authentication_verification.json())
    return authentication_verification
