function v9_13(){document.getElementById("i9_8").addEventListener("click",(function(){v4_11()})),document.getElementById("i7_11").addEventListener("click",(function(){v9_18()})),document.getElementById("i0_1").addEventListener("click",(function(){v8_1()})),document.getElementById("i3_2").addEventListener("click",(function(){v3_2()})),document.getElementById("i5_3").addEventListener("click",(function(){v3_2()}))}function v4_11(){let e=document.getElementById("i8_9");e.style.background="white !important",e.style.padding="0 !important",document.title="sn-prompt-generator_"+(new Date).getTime()+".pdf",window.print()}function v7_14(){let e=(new Date).getFullYear();document.getElementById("i4_14").innerText=e}function v8_1(){v5_0(prompt("The Purpose of These SNs: \n\nHelp children see and look for the good in every sermon, \nand equip them with healthier coping methods. \n\nOpen their minds to the idea that they can find a way that's \nboth ___ ___ ___.\n ","what and what"))?(document.getElementById("i7_4").style.display="block",v2_15()):alert("To make sure we're on the same page, \n\nplease check the notes about the purpose of these Sermon Note sheets.\n ")}function v5_0(e){const t=[83,80,73,82,73,84,85,65,76,32,65,78,68,32,70,85,78];for(let n=0;n<e.length;n++)if(e[n].toUpperCase()!==String.fromCharCode(t[n]))return!1;return!0}function v2_15(){let e=v6_6();document.getElementById("i5_6").innerText=e.length+" Prompts:",v4_12("i9_10");for(let t=0;t<e.length;t++){let n=v7_4(e[t]),o=document.createElement("LI");o.appendChild(n),document.getElementById("i9_10").appendChild(o)}}function v4_12(e){const t=document.getElementById(e);for(;t.firstChild;)t.removeChild(t.firstChild)}function v7_4(e){let t=document.createElement("BUTTON");return t.innerText=e,t.onclick=function(){document.getElementById("i8_9").innerText=e,v3_2(),v9_9()},t}function v3_2(){document.getElementById("i7_4").style.display="none"}function v9_18(){v2_3(v8_10(v6_6())),v9_9()}function v4_17(){v3_5(v8_10(v1_8()))}function v5_16(){document.getElementById("i0_13").innerText=v8_10(["Sermon topic","Topic"]),document.getElementById("i6_7").innerText=v8_10(["My name","Notekeeper name"])}function v8_10(e){if(!Array.isArray(e))throw"messages input must be an array";return e[v1_7(0,e.length)]}function v1_7(e,t){return e+Math.floor(Math.random()*t)}function v2_3(e){document.getElementById("i8_9").innerText=e}function v3_5(e){document.getElementById("i5_12").innerText=e}function v9_9(){let e=document.getElementById("i8_9");e.style.background="yellow",e.style.padding="10px",setTimeout((function(){e.style.background="white",e.style.padding="0"}),500)}function v6_6(){return["Write each Bible passage location. Next to them, try to summarize each passage (NOT each verse) in very few words. You can write in note-taking style sentences.","Write down the hymn numbers and each main point. How does each of the hymns relate to different parts of the whole sermon?","Write down each main point in the sermon. How does each main point relate to the other main points?","Write each main point of the story. If there's no story, imagine situations that the main points could be used in. What should you do? What habits will help you be ready?","Write down each main point. Look at each one, and think of how this could encourage someone in their life of faith.","Write each main point. Connect each one with a memory from your life that relates to at least one of the main points in this sermon.","Write each main point. Try to draw each one. If it feels hard, keep thinking of a creative way to think about it until you find a way to draw it.","Write down each main point as a question (instead of an ordinary sentence) so you can test someone on the answers. What are the main points?","Write each main point. Underline key words. Add pictures under the key words. (Key words capture main ideas in few words so you can remember them easier, and do them).","Write down each main point or teaching, and add way(s) that you can apply/practice EACH of the teachings in your life.","Write each main point, but also note down a different perspective (point of view) about each main point.","(ADVANCED:) Write down each main point. About 3/4 into the sermon, try to decide which one is a key take-away for you. Draw the key takeaway (as an idea/concept summary? or you trying to practice it?).","(ADVANCED:) Write each main point. Then capture as much info from this sermon in as few words as possible, in one sentence.","(ADVANCED:) Write each main point, but add how you might use it in an emergency. Like if you have little time to think on the spot, how might you prepare beforehand?","(ADVANCED:) Write down each main point, then make a song out of the sermon's main points.","(ADVANCED:) Write each main point. Wait for about 3/4 of the sermon to figure out the most important (non-obvious) message. Make a comic out of it (while still listening!)."]}function v1_8(){return['Remember to try to not draw unrelated things. This sheet is to help you see the bigger picture and "Soar like an eagle" on Sabbath.',"Please don't draw unrelated things somewhere else. Open your mind to notice something you didn't think of before.","Please remember to focus during the sermon. If you don't focus, you might think they're saying something they're actually not. (The bigger picture builds on the parts.)","Please focus, and don't draw unrelated things or chat. Remember: God is watching!"]}navigator.serviceWorker&&navigator.serviceWorker.register("service-worker.js",{scope:""}),v7_14(),v9_18(),v4_17(),v5_16(),v9_13(),setTimeout((function(){document.getElementById("i9_8").innerText="→ Print"}),2e3),setTimeout((function(){let e=document.getElementById("i0_1");e.className=e.className.replace(/temporarily-yellow/g,"")}),1e3);
