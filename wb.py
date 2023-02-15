from webauthn import (
    generate_registration_options,
    verify_registration_response,
    options_to_json,
    base64url_to_bytes,
)
from webauthn.helpers.cose import COSEAlgorithmIdentifier
from webauthn.helpers.structs import (
    AttestationConveyancePreference,
    AuthenticatorAttachment,
    AuthenticatorSelectionCriteria,
    PublicKeyCredentialDescriptor,
    ResidentKeyRequirement,
    RegistrationCredential,
)
from webauthn.helpers.json_loads_base64url_to_bytes import (
    json_loads_base64url_to_bytes
)
import json
from config import *

def create_options_using_webauthn():
        registration_options = generate_registration_options(
        rp_id="localhost",
        rp_name="Galam Judicial System",
        user_id="16544852asd5asd651",
        user_name="Vishwa Mithra",
        user_display_name="Vishwa Mithra",
        attestation=AttestationConveyancePreference.DIRECT,
        authenticator_selection=AuthenticatorSelectionCriteria(
            # resident_key=ResidentKeyRequirement.REQUIRED,
        ),
        challenge=b"asdjkhdfa65as8df4",
        supported_pub_key_algs=[
        
                                # COSEAlgorithmIdentifier.ECDSA_SHA_384,
                                # COSEAlgorithmIdentifier.RSASSA_PKCS1_v1_5_S/HA_256,
                                COSEAlgorithmIdentifier.RSASSA_PSS_SHA_256,
                                COSEAlgorithmIdentifier.ECDSA_SHA_256,
                                # COSEAlgorithmIdentifier.RSASSA_PKCS1_v1_5_SHA_1,
                                # COSEAlgorithmIdentifier.ECDSA_SHA_512
                                ],
        # timeout=12000,
        )
        simple_registration_options=options_to_json(registration_options) ###########THIS FUNCTION MESSES UP THE CHALLENGE VALUE.##################
        
        challenger=json.loads(simple_registration_options)["challenge"] #########THIS IS THE CHALLENGE WHICH NEEDS TO BE SAVED IN THE DATABASE NOT THE ONE ABOVE.#################

        print(challenger)  ####### THIS IS THE CHALLENGE WHICH NEEDS TO BE SAVED IN THE DATABASE NOT THE ONE ABOVE. #################
        
        return simple_registration_options

def registration_verification(response_json_object):
    g1=RegistrationCredential.parse_raw(json.dumps(response_json_object)
    )
    registration_verification = verify_registration_response(
    credential=RegistrationCredential.parse_raw(json.dumps(response_json_object)
    ),
    expected_challenge=b"YXNkamtoZGZhNjVhczhkZjQ",
    expected_origin="http://localhost:8001",
    expected_rp_id="localhost",
    require_user_verification=False,
    supported_pub_key_algs=[
                     COSEAlgorithmIdentifier.ECDSA_SHA_256,
    ]
    )
    print(json.loads(registration_verification.json())["credential_id"])
    assert registration_verification.credential_id == base64url_to_bytes(
    response_json_object["id"]
     )
    print( response_json_object["id"])
    dac=dab["USER_CREDENTIALS"]
    dac.insert_one({"credential_id":registration_verification.credential_id,"public_key":registration_verification.credential_public_key,"email":"mithravishwa37@gmail.com"})
    return True
       
