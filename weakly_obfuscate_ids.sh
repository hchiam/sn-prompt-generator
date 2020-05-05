cd public

htmlName='index.html'
htmlName2='offline-page.html'
htmlText=`cat ${htmlName}`
idNames=()

global_rematch() { 
    local s=$1 regex=$2 
    while [[ $s =~ $regex ]]; do 
        # echo "${BASH_REMATCH[1]}"
        idNames+=("${BASH_REMATCH[1]}")
        s=${s#*"${BASH_REMATCH[1]}"}
    done
}

replace_all_matches() {
  idName=$1
  replacement=$2
  sed -i '' "s/id=\"${idName}\"/id=\"${replacement}\"/g" $htmlName
  sed -i '' "s/id=\"${idName}\"/id=\"${replacement}\"/g" $htmlName2
  sed -i '' "s/\"${idName}\"/\"${replacement}\"/g" 'minified-script.js'
  sed -i '' "s/#${idName}{/#${replacement}{/g" 'minified-style.css'
}

regex='id="([a-zA-Z0-9_:.-][a-zA-Z0-9_:.-]*)"'
global_rematch "$htmlText" "$regex"

# replace array with unique values:
idNames=($(echo "${idNames[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))

# printf '%s\n' "${idNames[@]}" # print all

# echo "length of array: ${#idNames[@]}"
# echo "random name: v$((RANDOM % 10))_0"
for i in "${!idNames[@]}"
do
  idName=${idNames[$i]}
  randomName="i$((RANDOM % 10))_$i"
  # echo "index: $i    random name: $randomName    <-    id name: ${idNames[$i]}"
  replace_all_matches $idName $randomName
done
