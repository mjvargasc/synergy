const fs=require('fs');let a=fs.readFileSync('app.js','utf8');
for(const name of ['homeView','sessionView','mobileView','mobileTracking','residentialView','walletView','profileView'])a=a.replace(new RegExp('^function '+name+'\\(.*$','m'),'');
a=a.replace('const {stations,initial,transition}=Synergy;','const {stations,tariffs,homeStates,initial,migrate,available,expire,now,priceMobile,transition}=Synergy;');
a=a.replace('const Experience=window.SynergyExperience;',`const Experience=new Proxy({}, {get:(_,name)=>(...args)=>{try{return window.SynergyExperience?.[name]?.(...args)??(name==='volume'?40:'');}catch{try{window.SynergyExperience?.close?.();}catch{}document.querySelector('.experience-dialog')?.remove();return name==='volume'?40:'';}}});`);
const loadStart=a.indexOf('try{const saved=JSON.parse'),loadEnd=a.indexOf('\nlet page=',loadStart);a=a.slice(0,loadStart)+`try{const saved=JSON.parse(localStorage.getItem(KEY));if(saved)state=migrate(saved);}catch{storageWarning=true;}\nlet compatibility='all',activityFilter='all',expiryTimer=null,lastAction='',lastActionTime=0;`+a.slice(loadEnd);
a=a.replace("const navItems=[['home','home','Inicio'],['station','station','Station'],['mobile','mobile','Mobile'],['residential','bolt','Home'],['wallet','wallet','Billetera'],['profile','user','Perfil']];","const navItems=[['home','home','Inicio'],['services','station','Servicios'],['activity','clock','Actividad'],['wallet','wallet','Billetera'],['profile','user','Perfil']];\nconst navPage=()=>['station','mobile','residential','session'].includes(page)?'services':page;");
a=a.replace(/^const guideTexts=.*$/m,"const guidePages=['home','wallet','station','mobile','residential'];\nconst guideTexts=['01 / Inicio · Conoce a Mathias y las tres formas de recargar.','02 / Billetera · Añade USD 10 y muestra la animación del carrito.','03 / Station · Reserva, elige objetivo e inicia una carga simulada.','04 / Mobile · Introduce 7 km y muestra el total de USD 16. Avanza el seguimiento.','05 / Home · Solicita evaluación y distingue el registro de la instalación.'];");
a=a.replace('function render(){','function render(){if(expire(state)){save();notify("Reserva vencida. El conector quedó libre sin débito.");}scheduleExpiry();');
a=a.replace("btn('Explorar demostración '+icon('arrow')", "btn('Continuar como '+esc(state.user.name)+' '+icon('arrow')");
a=a.replaceAll("page===id?", "navPage()===id?");
a=a.replace('esc(state.user.name.slice(0,1).toUpperCase())','esc(state.user.avatar)');
a=a.replace("'Modo presentación'","'Modo jurado'");
a=a.replace("guide===2?'Volver a Station'", "guide===4?'Volver al inicio'");
a=a.replace('home:homeView,station:stationView','home:homeView,services:servicesView,activity:activityView,station:stationView');
a=a.replace('<main id="main" class="main" tabindex="-1">${({','<main id="main" class="main" tabindex="-1">${[\'station\',\'mobile\',\'residential\'].includes(page)?serviceTabs():\'\'}${({');
a=a.replace('· Vehículo de demostración</small>', '· Vehículo demo · ${Math.round(state.user.range*state.battery/100)} km estimados</small>');
a=a.replace('return stations.filter(s=>','return stations.filter(s=>!s.expansion).map(s=>({...s,free:available(state,s)})).filter(s=>');
a=a.replace("&&(power==='all'||s.power>=Number(power))", "&&(compatibility==='all'||s.connector===state.user.connector)&&(power==='all'||s.power>=Number(power))");
a=a.replace('<label>Potencia demo<select id="power">','<label>Compatibilidad<select id="compatibility"><option value="all">Todos los conectores</option><option value="match" ${compatibility===\'match\'?\'selected\':\'\'}>Mi vehículo (${esc(state.user.connector)})</option></select></label><label>Potencia demo<select id="power">');
a=a.replace("heading('Tu siguiente punto de carga','Encuentra, reserva y continúa tu camino.')","heading('Tu siguiente punto de carga','Dos estaciones fijas en el escenario inicial del plan · Datos de demostración.')");
a=a.replace('<div class="detail-footer"><div class="price">','<p class="muted">Horario demo: ${st.hours} · Conector ${st.connector}. ${st.connector===state.user.connector?\'Compatible con tu vehículo demo.\':\'Incompatible con tu vehículo demo.\'}</p><div class="detail-footer"><div class="price">');
a=a.replace("btn(st.free?'Revisar reserva '+icon('arrow'):'Estación ocupada'", "btn(!st.free?'Estación ocupada':st.connector!==state.user.connector?'Conector incompatible':'Revisar reserva '+icon('arrow')");
a=a.replace("${st.free?'':'disabled'}`)","${st.free&&st.connector===state.user.connector?'':'disabled'}`)");
a=a.replace('</div></section>`:\'\'}</div></div>`;}','</div><div class="actions">${btn(st.free?\'Simular ocupación\':\'Liberar ocupación demo\',\'occupancy\',\'\',`data-id="${st.id}" ${state.active?.stationId===st.id?\'disabled\':\'\'}`)}</div></section>`:\'\'}</div></div><section class="expansion"><h2>Propuestas de expansión</h2><p class="muted">Fuera del arranque de dos estaciones. Sin disponibilidad ni reservas.</p>${stations.filter(s=>s.expansion).map(s=>`<span>${s.name} · Propuesta</span>`).join(\'\')}</section>`;}');
a=a.replace("r.status==='Cancelado'?'Solicitud cancelada sin cargo.'", "['Cancelado','Reserva vencida'].includes(r.status)?'Operación cerrada sin cargo.'");
a=a.replace("${line('Vehículo',esc(r.vehicle))}","${r.kind==='mobile'&&r.quote?quoteView(r.quote):''}${line('Vehículo',esc(r.vehicle))}");
a=a.replace("'data-page=\"wallet\"')}</div></section>`;}","'data-page=\"activity\"')}</div></section>`;}");
const reviewStart=a.indexOf(" else if(a==='reviewReserve')"),reviewEnd=a.indexOf(" else if(['start'",reviewStart);a=a.slice(0,reviewStart)+" else if(a==='reviewReserve')reviewReservation(Number(b.dataset.id));\n"+a.slice(reviewEnd);
a=a.replace("if(run(a)&&old&&!state.active)","if(run(a,{step:b.dataset.step===undefined?undefined:Number(b.dataset.step)})&&old&&!state.active)");
a=a.replace("go(['station','mobile','residential'][guide])","go(guidePages[guide])").replace("guide=(guide+1)%3","guide=(guide+1)%5");
a=a.replace("const a=b.dataset.action;",`const a=b.dataset.action;if(['advance','mobileNext','homeNext','scheduleStart','start','expireDemo'].includes(a)){const time=performance.now();if(lastAction===a&&time-lastActionTime<350)return;lastAction=a;lastActionTime=time;} `);
a=a.replace("else if(a==='theme')",`else if(a==='help')helpView();
 else if(a==='occupancy')run('occupancy',{id:Number(b.dataset.id)});
 else if(a==='expireDemo'){receipt=null;run('expireDemo');go('activity');notify('Reserva vencida: conector libre, sin débito.');}
 else if(a==='homeNext')run('homeNext',{id:b.dataset.id,step:Number(b.dataset.step)});
 else if(a==='resumePending'){const p=state.pending;if(p){if(p.action==='reserve')reviewReservation(p.payload.id,p.payload.target);else reviewMobile(p.payload);}}
 else if(a==='pendingTopup'){closeModal();go('wallet');}
 else if(a==='contact')contactDialog(b.dataset.kind);
 else if(a==='copyMessage')copyContact();
 else if(a==='homeDetail'){const h=state.home.find(h=>h.id===b.dataset.id);modal('Detalle residencial',homeRecord(h)+(h.updates||[]).map(u=>line(esc(u.status),esc(u.date))).join(''),'Cerrar',closeModal);}
 else if(a==='transaction'){const t=state.transactions.find(t=>t.id===b.dataset.id);modal('Movimiento simulado',line('Concepto',esc(t.name))+line('Fecha',esc(t.date))+line('Importe',money(t.amount))+line('Estado','Registrado una sola vez'),'Cerrar',closeModal);}
 else if(a==='theme')`);
a=a.replace("compatibility='all',", "compatibility='all',");
a=a.replace("availability=power='all';sort=", "availability=power=compatibility='all';activityFilter='all';sort=");
const confirmationStart=a.indexOf('function confirmDomain('),confirmationEnd=a.indexOf('\ndocument.addEventListener',confirmationStart);
a=a.slice(0,confirmationStart)+`function confirmDomain(action,payload,next,message){try{const before=state.balance;transition(state,action,payload);save();closeModal();if(next)page=next;render();$('#main')?.focus({preventScroll:true});if(action==='topup'&&state.balance>before)Experience.wallet({before,after:state.balance,amount:payload.amount});else{Experience.audio(action==='cancel'||action==='stop'?'cancel':'complete');if(message)notify(message);}}catch(e){Experience.audio('validation');if(['reserve','mobile'].includes(action)&&e.message.includes('Saldo insuficiente')){state.pending={action,payload};save();$('#modal-error').innerHTML=esc(e.message)+btn('Recargar y volver','pendingTopup','primary');}else $('#modal-error').textContent=e.message;}}
`+a.slice(confirmationEnd);
a=a.replace("}catch(e){notify(e.message);return false;}","}catch(e){Experience.audio('validation');notify(e.message);render();return false;}");
a=a.replace("if(action==='start')Experience.audio('connect');else if(['advance','mobileNext'].includes(action))Experience.audio(state.active?'step':'complete');", "if(action==='start')Experience.audio('connect');else if(['advance','mobileNext','homeNext'].includes(action))Experience.audio(action==='mobileNext'&&state.active?.step===3?'arrival':state.active?'step':'complete');");
const inputStart=a.indexOf("document.addEventListener('input'");a=a.slice(0,inputStart);
fs.writeFileSync('app.js',a);
let html=fs.readFileSync('index.html','utf8').replace('<script src="app.js">','<script src="product-views.js"></script><script src="app.js">').replace('</head>','<link rel="stylesheet" href="product.css"></head>');fs.writeFileSync('index.html',html);
