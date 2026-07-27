# Runtime matrix

| Capability                             | Runtime-neutral core | AutoJs6 Android runtime       | Node.js offline harness |
| -------------------------------------- | -------------------- | ----------------------------- | ----------------------- |
| Validate `content://` URI shape        | Yes                  | Uses core rule                | Uses sample URIs        |
| Validate description constraints       | Yes                  | Uses core rule                | Uses sample metadata    |
| Enforce exactly seven English keywords | Yes                  | Uses core rule                | Uses sample metadata    |
| Read Android gallery content           | No                   | Intended, not implemented     | No                      |
| Send images to an AI Vision provider   | No                   | Intended, not implemented     | No                      |
| Open the Contributor Android app       | No                   | Intended, not implemented     | No                      |
| Fill Description and Keywords fields   | No                   | Intended, not implemented     | No                      |
| Confirm final submission               | No                   | User only                     | No                      |
| Require API keys                       | No                   | Provider-dependent at runtime | No                      |

## Interpretation

The core is portable validation logic, not an application runtime. The AutoJs6
column describes the intended production environment but remains unimplemented
in this bootstrap. The Node.js harness is development tooling and must not be
packaged or described as the Android product.
