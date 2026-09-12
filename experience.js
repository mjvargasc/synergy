/* Local audiovisual layer. Never writes financial or service state. */
window.SynergyExperience=(()=>{
  'use strict';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let level=40;try{const saved=localStorage.getItem('synergy-sound-volume');if(saved!==null)level=Math.max(0,Math.min(100,Number(saved)||0));}catch{}
  let muted=false,context=null,frame=0,finishTimer=0,voices=[],dialog=null,previousFocus=null;
  try{muted=localStorage.getItem('synergy-sound-muted')==='true';}catch{}
  const format=n=>'$'+n.toLocaleString('es-EC',{minimumFractionDigits:2,maximumFractionDigits:2});
  function button(){return `<button class="sound-control" data-action="sound" aria-pressed="${!muted}" aria-label="${muted?'Activar':'Silenciar'} sonidos"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4zM17 8q5 4 0 8"/>${muted?'<path d="m3 3 18 18"/>':''}</svg><span>${muted?'Sin sonido':'Sonido'}</span></button>`;}
  function stopAudio(){voices.forEach(v=>{try{v.stop();}catch{}});voices=[];}
  function toggle(){muted=!muted;try{localStorage.setItem('synergy-sound-muted',muted);}catch{}if(muted)stopAudio();document.querySelectorAll('.sound-control').forEach(b=>{b.outerHTML=button();});document.querySelector('.sound-control')?.focus({preventScroll:true});}
  function audio(type){
    if(muted||document.hidden||level===0)return;
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
      context??=new Audio();if(context.state==='suspended')context.resume().catch(()=>{});
      stopAudio();const now=context.currentTime;
      const note=(frequency,offset,duration,volume=.035,end=frequency)=>{
        volume*=level/100;const o=context.createOscillator(),g=context.createGain();o.type='sine';o.frequency.setValueAtTime(frequency,now+offset);o.frequency.exponentialRampToValueAtTime(end,now+offset+duration);
        g.gain.setValueAtTime(0,now+offset);g.gain.linearRampToValueAtTime(volume,now+offset+.025);g.gain.exponentialRampToValueAtTime(.0001,now+offset+duration);o.connect(g);g.connect(context.destination);o.start(now+offset);o.stop(now+offset+duration+.03);voices.push(o);o.onended=()=>{o.disconnect();g.disconnect();voices=voices.filter(v=>v!==o);};
      };
      if(type==='wallet'){
        note(180,0,.6,.018,450);
        [0,.17,.34].forEach((t,i)=>{note(620+i*70,.8+t,.19,.025);note(930+i*70,.82+t,.14,.008);});
        [261.63,329.63,392].forEach((f,i)=>note(f,1.85+i*.09,.48,.025));
      }else if(type==='connect'){
        note(320,0,.11,.025,500);note(130,.25,.65,.022,390);note(523.25,.9,.35,.025);note(659.25,1.02,.42,.018);
      }else if(type==='cancel'){note(330,0,.22,.025,260);}
      else if(type==='validation'){note(294,0,.17,.025);note(262,.13,.22,.018);}
      else if(type==='arrival'){note(392,0,.25,.025);note(523,.13,.35,.023);}
      else if(type==='amount'){note(392,0,.12,.02,494);}
      else if(type==='click'){note(260,0,.07,.015,310);}
      else if(type==='complete'){[329.63,440,659.25].forEach((f,i)=>note(f,i*.1,.45,.025));}
      else note(440,0,.17,.022,590);
    }catch{/* Audio is optional; a blocked device must never block the operation. */}
  }
  function close(){cancelAnimationFrame(frame);clearTimeout(finishTimer);stopAudio();if(dialog){dialog.close();dialog.remove();dialog=null;}if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});else document.querySelector('#main')?.focus({preventScroll:true});}
  function wallet({before,after,amount}){
    close();previousFocus=document.activeElement;dialog=document.createElement('dialog');dialog.className='experience-dialog';dialog.setAttribute('aria-labelledby','experience-title');
    dialog.innerHTML=`<span class="pill">Recarga simulada</span><h2 id="experience-title">Un impulso para tu próxima ruta</h2><p class="muted">Tu saldo de demostración está listo para moverte.</p><div class="wallet-stage" aria-hidden="true"><svg viewBox="0 0 520 220"><path d="M30 187h460" stroke="#D8E8EE" stroke-width="2"/><g class="money-cart"><g fill="#B7F2D0" stroke="#087A42" stroke-width="2"><path d="m64 94 16-52 61 19-15 51Z"/><path d="m101 95 2-52 65 4-3 55Z"/></g><path d="m87 70 35 11m-5-16-8 30m12-30 24 2" stroke="#087A42" stroke-width="3"/><g fill="#FFC96B" stroke="#AF7428" stroke-width="2"><circle cx="145" cy="89" r="13"/><circle cx="119" cy="83" r="13"/></g><path d="M30 80h17l18 68h103l18-49H54M68 148l-7 16h105" fill="#E2F7FC" fill-opacity=".85" stroke="#073B4C" stroke-width="5" stroke-linejoin="round"/><path d="M85 104v32m30-32v32m30-32v32" stroke="#16C7E8" stroke-width="3"/><circle cx="76" cy="178" r="10" fill="#073B4C"/><circle cx="153" cy="178" r="10" fill="#073B4C"/></g><g class="synergy-wallet"><path d="M325 73l114-23v43H325Z" fill="#35E875" stroke="#087A42" stroke-width="2"/><rect x="314" y="76" width="154" height="105" rx="17" fill="#073B4C"/><path d="M329 91h124" stroke="#437C8F" stroke-width="2"/><rect x="424" y="111" width="52" height="35" rx="9" fill="#16C7E8"/><circle cx="439" cy="128" r="4" fill="#073B4C"/><text x="330" y="143" fill="#FFFFFF" font-family="Arial,sans-serif" font-size="15" font-weight="700" letter-spacing="2">SYNERGY</text></g>${[0,1,2].map(i=>`<g class="flying-coin coin-${i}" fill="#FFC96B" stroke="#AF7428" stroke-width="2"><circle cx="178" cy="83" r="12"/><path d="M178 75v16m4-13h-6q-5 4 2 5t-2 5" fill="none"/></g>`).join('')}</svg><div class="received-amount">+${format(amount)}</div></div><div class="animated-balance"><small>SALDO DE DEMOSTRACIÓN</small><strong id="animated-balance" aria-hidden="true">${format(before)}</strong><span class="sr-only">Saldo anterior ${format(before)}. Nuevo saldo ${format(after)}.</span></div><div class="experience-result" role="status"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L20 5"/></svg><span>Saldo recargado</span></div><div class="experience-controls">${button()}<button id="experience-skip">Continuar</button></div>`;
    document.body.append(dialog);dialog.showModal();dialog.querySelector('#experience-skip').onclick=close;dialog.addEventListener('cancel',e=>{e.preventDefault();close();});audio(reduced.matches?'complete':'wallet');
    const start=performance.now();function count(t){if(!dialog)return;const p=reduced.matches?1:Math.min(1,Math.max(0,(t-start-750)/1350));dialog.querySelector('#animated-balance').textContent=format(before+(after-before)*(1-Math.pow(1-p,3)));if(p<1)frame=requestAnimationFrame(count);}
    frame=requestAnimationFrame(count);finishTimer=setTimeout(close,reduced.matches?1000:2800);
  }
  function chargeScene(){return `<div class="charge-scene" role="img" aria-label="Conector acoplándose al vehículo y energía recorriendo el cable desde el cargador"><svg viewBox="0 0 520 220"><path d="M20 189h480" stroke="#D1E6ED" stroke-width="2"/><g><rect x="381" y="29" width="63" height="159" rx="11" fill="#073B4C"/><rect x="391" y="40" width="43" height="45" rx="5" fill="#145970"/><path d="m416 45-15 23h11l-3 12 18-25h-12Z" fill="#35E875"/><text x="389" y="108" fill="white" font-size="9" font-family="Arial" letter-spacing="1">SYNERGY</text><rect x="397" y="131" width="28" height="5" rx="2" fill="#35E875"/></g><path class="charge-cable" d="M444 118C506 118 491 182 459 178L310 149"/><path class="energy-pulse" d="M444 118C506 118 491 182 459 178L310 149"/><path d="m44 138 37-14 38-58h114l51 63 30 9 7 39H35Z" fill="#F5F8FA" stroke="#8BB2C2" stroke-width="2"/><path d="m128 77-28 46h155l-34-46Z" fill="#073B4C"/><path d="M174 77v46" stroke="#78A5B7" stroke-width="2"/><path d="M40 143h39m187 0h40" stroke="#16C7E8" stroke-width="6"/><circle cx="94" cy="174" r="24" fill="#102A36"/><circle cx="94" cy="174" r="12" fill="#A3CBD9"/><circle cx="260" cy="174" r="24" fill="#102A36"/><circle cx="260" cy="174" r="12" fill="#A3CBD9"/><circle cx="307" cy="146" r="8" fill="#073B4C"/><g class="coupling"><path d="M326 150h-18" stroke="#073B4C" stroke-width="7"/><rect x="311" y="140" width="19" height="14" rx="4" fill="#35E875"/></g><circle class="connection-glow" cx="308" cy="147" r="13" fill="none" stroke="#35E875" stroke-width="3"/></svg><span>Conexión y flujo de energía simulados</span></div>`;}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)close();});
  reduced.addEventListener('change',()=>{if(reduced.matches)close();});
  window.addEventListener('pagehide',close);
  function volume(){return level;}
  function setVolume(value){level=Math.max(0,Math.min(100,Number(value)||0));stopAudio();try{localStorage.setItem('synergy-sound-volume',String(level));}catch{}}
  function progress(before,after){cancelAnimationFrame(frame);if(reduced.matches)return;const meter=document.querySelector('.charge-meter');if(!meter)return;const label=meter.querySelector('strong'),start=performance.now();function tick(t){if(!meter.isConnected)return;const p=Math.min(1,(t-start)/550),v=before+(after-before)*(1-Math.pow(1-p,3));meter.style.setProperty('--value',v);if(label)label.textContent=Math.round(v)+'%';if(p<1)frame=requestAnimationFrame(tick);}frame=requestAnimationFrame(tick);}
  return {button,toggle,wallet,chargeScene,audio,close,volume,setVolume,progress};
})();
