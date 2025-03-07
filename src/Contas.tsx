const lista = [
  "segunda =",
  "terça =",
  "quarta =",
  "quinta = ",
  "sexta =",
  "sabado =",
  "domingo =",
];

const Contas = () => {
  return (
    <div className="text-amber-50 border-1 flex-1/2">
      {lista.map((dia, test) => (
        <div key={test}>{dia}</div>
      ))}
    </div>
  );
};

export default Contas;
