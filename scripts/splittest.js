const input = "words separated by spaces spaces spaces by words wo";
let keys = {};
let words = input.split(" ");
for (let index in words){
    console.log(words[index]);
    keys[words[index]] = (keys[words[index]] || 0) + 1;
}
console.dir(keys);