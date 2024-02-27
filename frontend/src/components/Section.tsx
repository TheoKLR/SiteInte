import './SectionStyle.css';

interface RubriqueProps {
    titre: string;
    contenu : React.FunctionComponent;
}

export const Rubrique: React.FC<RubriqueProps> = ({titre, contenu:Contenu}) => {

    return (
        <>
            <div className='container'>
                <div className='titre'>
                    <h2>{titre}</h2>
                    <hr />
                </div>
                <div className='contenu'>
                    <Contenu/>
                </div>
            </div>

        </>
    )
}