import styled from "styled-components";

function Habits() {
    return (
        <Conteiner>
            <AddHabit>
                <h2>Meus hábitos</h2>
                <ion-icon name="add-sharp"></ion-icon>
            </AddHabit>
            <article>
                <input type="text" placeholder="nome do hábito" />
                <div className="weekdays">
                    <span>D</span>
                    <span>S</span>
                    <span>T</span>
                    <span>Q</span>
                    <span>Q</span>
                    <span>S</span>
                    <span>S</span>
                </div>
                <div className="options">
                    <button>Cancelar</button>
                    <button>Salvar</button>
                </div>
            </article>
            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
        </Conteiner>
    );
}

export default Habits;

const Conteiner = styled.main`    
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    padding-top: var(--height-header);
    padding-inline: var(--padding-inline);
    background-color: var(--backgroud-main);

    p {
        margin-top: 2.8rem;
        font-size: var(--font-size-p);
        color: var(--color-text-gray);
    }

    article {
        display: flex;
        flex-direction: column;
        
        margin-top: 2.2rem;
        padding: 18px;
        border-radius: 10px;

        background-color: #fff;
    }

    article input {
        height: 3.5rem;        

        margin-bottom: 10px;
        padding-left: 20px;

        font-size: var(--font-size-login);
        
        border: 1px solid #D5D5D5;
        border-radius: 10px;
        color: var(--color-text-gray);
    }

    input::placeholder {
        color: var(--color-gray-desabled);
    }

    article .weekdays {
        display: flex;
    }

    article .weekdays span {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 2.8rem;
        height: 2.8rem;
        margin-inline-end: 4px;

        font-size: var(--font-size-p);
        color: var(--color-text-gray);

        border: 1px solid var(--color-gray-desabled);
        border-radius: 10px;
        color: var(--color-gray-desabled);
    }   
    
    span:hover{
        cursor: pointer;    
        background-color: var(--color-gray-desabled);
        color: #fff;
    }

    article .options {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        margin-top: 30px;
    }

    article button {
        height: 3.2rem;

        padding-inline: 22px;
        font-size: var(--font-size-p);

        border-radius: 10px;

        background: var(--color-main);
        color: #fff;
    }

    article button:first-child {
        background: none;
        color: var(--color-main);
    }
`

const AddHabit = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 2.8rem;

    font-size: var(--font-size-h2);
    color: var(--color-header);

    ion-icon {

        padding: 0 3px;
        font-size: 2.8rem;

        border-radius: 7px;

        background-color: var(--color-main);
        color: #fff;
    }
`