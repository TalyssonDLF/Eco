const menuBtn=document.querySelector('.menu-toggle'),menu=document.getElementById('menu');
function showMenu(open){menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.classList.toggle('open',open)}
menuBtn.addEventListener('click',()=>showMenu(menuBtn.getAttribute('aria-expanded')!=='true'));menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>showMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')showMenu(false)});
const contactEmail=''; // Configure com o e-mail real para habilitar o envio.
const form=document.getElementById('contact-form'),feedback=document.getElementById('feedback');
form.querySelectorAll('input,select,textarea').forEach(field=>field.addEventListener('input',()=>{field.removeAttribute('aria-invalid');feedback.textContent=''}));
form.addEventListener('submit',e=>{e.preventDefault();const invalid=[...form.querySelectorAll('input,select,textarea')].filter(f=>!f.checkValidity());if(invalid.length){invalid.forEach(f=>f.setAttribute('aria-invalid','true'));feedback.textContent='Confira os campos destacados. A mensagem precisa ter pelo menos 10 caracteres.';invalid[0].focus();return}if(!contactEmail){feedback.textContent='Para habilitar o envio, configure o e-mail de destino em script.js.';return}const d=new FormData(form);const subject=encodeURIComponent('Contato pelo site ECO — '+d.get('nome'));const body=encodeURIComponent('Nome: '+d.get('nome')+'\nE-mail: '+d.get('email')+'\nCidade: '+d.get('cidade')+' / '+d.get('uf')+'\n\n'+d.get('mensagem'));location.href='mailto:'+contactEmail+'?subject='+subject+'&body='+body;feedback.textContent='Seu aplicativo de e-mail será aberto para confirmar o envio.'});

/* Fade-up once when text enters the viewport. Disabled for reduced-motion users. */
(() => {
  if (typeof IntersectionObserver === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const nodes=[...document.querySelectorAll('.reveal')];
  if (!nodes.length) return;
  nodes.forEach((el,i)=>{if(i%3===1) el.classList.add('delay-1'); else if(i%3===2) el.classList.add('delay-2')});
  // Delay adding the class until observers exist, avoiding permanently hidden content.
  const observer=new IntersectionObserver((entries,o)=>{
    for(const entry of entries) if(entry.isIntersecting){entry.target.classList.add('is-visible');o.unobserve(entry.target)}
  },{threshold:0.12,rootMargin:'0px 0px -7% 0px'});
  for(const el of nodes)observer.observe(el);
  document.documentElement.classList.add('js-reveal');
})();
