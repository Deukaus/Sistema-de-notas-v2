import React from 'react';
import './style.css';

export default function Aluno() {
    return (
        <div className="containerA">
            <div className="contentA">
                <table className="tabela-full">
                    <thead>
                        <tr>
                            <th>Disciplina</th>
                            <th>1° Bimestre</th>
                            <th>2° Bimestre</th>
                            <th>3° Bimestre</th>
                            <th>4° Bimestre</th>
                            <th>CF</th>
                        </tr>
                        <tr>
                            {['N', 'F', 'AC', '%Freq']*4}
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}