async function run() {
  try {
    const res = await fetch('http://localhost:3000/api/gerador/esboco', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tema: 'A importância da fé',
        texto: 'Hebreus 11:1',
        objetivo: 'Fortalecer a fé',
        publico: 'Adultos',
        tipo: 'Expositiva'
      })
    });
    
    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Data:", JSON.stringify(data).substring(0, 500) + '...');
  } catch (err) {
    console.error(err);
  }
}
run();
