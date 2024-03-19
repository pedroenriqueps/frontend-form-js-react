import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function App() {
  const schema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório").min(4, "o nome deve ter pelo menos 4 caracteres"),
    cpf: yup.string()
      .required('CPF é obrigatório')
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
    password: yup.string()
      .required('Senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
  });  

  const {register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const handleCpfChange = (event) => {
    const { value } = event.target;
    const maskedValue = value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{3})(\d)/, '$1.$2') // Insere o ponto após os primeiros 3 dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Insere o ponto após os segundos 3 dígitos
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Insere o traço após os 3 últimos dígitos
    setValue('cpf', maskedValue);
  };

  const onSubmit = (data) => {
    console.log(data);
    
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div>
          <label htmlFor="name">Nome</label>
          <input type="text" autoComplete="off" {...register("name")} id="name" className="name" placeholder="Digite seu nome"/>
          {errors.name && (
                <p className="erro">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="cpf">CPF</label>
          <input
            type="text" 
            autoComplete="off"
            id="cpf" 
            className="cpf" 
            placeholder="Digite seu CPF"
            {...register("cpf")}
            onChange={handleCpfChange} // Adicionando evento de formatação de CPF
          />
          {errors.cpf && (
                <p className="erro">{errors.cpf.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="password" autoComplete="off" {...register("password")} id="password" className="password" placeholder="Digite sua senha"/>
          {errors.password && (
                <p className="erro">{errors.password.message}</p>
          )}
        </div>
        <div className="button-cont">
          <button>Entrar</button>
        </div>
      </form>
    </>
  )
}

export default App;
