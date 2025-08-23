const $=s=>document.querySelector(s);
async function load(p){const r=await fetch(p);return r.text();}
const files={
  system: "prompts/system_starter.md",
  karma: "prompts/karma_socratic.md",
  shen: "prompts/shen_balance.md",
  heimer: "prompts/heimer_professor.md",
  singed: "prompts/singed_hardmode.md"
};
$("#compose").onclick=async()=>{
  const picked=[...document.querySelectorAll('input[type="checkbox"]:checked')].map(x=>x.value);
  const parts=await Promise.all([load(files.system),...picked.map(k=>load(files[k]))]);
  const user=$("#u").value.trim();
  const prompt=`[SYSTEM]\n${parts[0]}\n\n[ROLES]\n${parts.slice(1).join("\n---\n")}\n\n[USER]\n${user}\n\n[請以覺察/推理/行動/風險/度量回覆，先丟≤3個關鍵提問]`;
  $("#out").textContent=prompt;
};
