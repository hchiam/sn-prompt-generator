scriptName='minified-script.js'
scriptText=`cat ${scriptName}`
functionNames=()

global_rematch() { 
    local s=$1 regex=$2 
    while [[ $s =~ $regex ]]; do 
        # echo "${BASH_REMATCH[1]}"
        functionNames+=("${BASH_REMATCH[1]}")
        s=${s#*"${BASH_REMATCH[1]}"}
    done
}

replace_all_matches() {
  functionName=$1
  replacement=$2
  # echo "s/${functionName}/${replacement}/g"
  # sed -i '' "s/${functionName}/${replacement}/g" $scriptName
  # echo "s/${functionName}(/${replacement}(/g"
  sed -i '' "s/${functionName}(/${replacement}(/g" $scriptName # match function name with open bracket
}

regex='function\ ([^(][^(]*)\('
global_rematch "$scriptText" "$regex"

# replace array with unique values:
functionNames=($(echo "${functionNames[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))

# printf '%s\n' "${functionNames[@]}" # print all

# echo "length of array: ${#functionNames[@]}"
# echo "random name: v$((RANDOM % 10))_0"
for i in "${!functionNames[@]}"
do
  functionName=${functionNames[$i]}
  randomName="v$((RANDOM % 10))_$i"
  # echo "index: $i    random name: $randomName    <-    function name: ${functionNames[$i]}"
  replace_all_matches $functionName $randomName
done
