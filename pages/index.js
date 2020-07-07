import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import PageTitle from '../components/PageTitle';

const fetcher = (...args)=> fetch(...args).then(res=> res.json());

const Index = ()=> {
    const { data, error } = useSWR('/api/get-promo', fetcher);

    return (
        <div>
         <PageTitle title='Seja bem-vindo' />
         
         <p className='mt-12 text-center'>
          Olá o restaurante x sempre busca atender melhor os seus clientes. <br/>
          Por isso, estamos sempre abertos para ouvir a sua opinão.
         </p>

            <div className='text-center my-12 '>
                <Link href='/pesquisa'>
                 <a className='bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow'>Dar opinião ou sugestão</a>
                </Link>
            </div>

            {!data && <p>Carregando...</p>}
            {!error && data && data.showCumpom &&
                <p className='my-12 text-center'>
                    {data.message}
                </p>
            }


        </div>
    );
};


export default Index;