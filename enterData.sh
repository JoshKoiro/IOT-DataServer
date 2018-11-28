# Input for each parameter
IFS= read -r -p "Parameter 1: " param1
IFS= read -r -p "Parameter 2: " param2

# process spaces to work with curl command
outputOne="${param1// /%20}"
outputTwo="${param2// /%20}"

# curl command to enter data
curl localhost:3000/write/"$outputOne"/"$outputTwo"