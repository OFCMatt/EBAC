// Seleciona os elementos do DOM para manipulação
const inputA = document.getElementById('input-a');
const inputB = document.getElementById('input-b');
const inputC = document.getElementById('input-c');
const calculateBtn = document.getElementById('calculate-btn');
const graphBtn = document.getElementById('graph-btn');
const resultsDiv = document.getElementById('results');
const parabolaChartElement = document.getElementById('parabolaChart');

// Variável para armazenar o gráfico (para poder atualizar depois)
let parabolaChart;

// Função para calcular as raízes da equação de segundo grau
function calcularRaizes() {
    const a = parseFloat(inputA.value);
    const b = parseFloat(inputB.value);
    const c = parseFloat(inputC.value);

    const discriminante = b * b - 4 * a * c;

    if (discriminante > 0) {
        const x1 = (-b + Math.sqrt(discriminante)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminante)) / (2 * a);
        resultsDiv.textContent = `As raízes reais são x1 = ${x1.toFixed(2)} e x2 = ${x2.toFixed(2)}.`;
    } else if (discriminante === 0) {
        const x = -b / (2 * a);
        resultsDiv.textContent = `A equação possui uma raiz dupla: x1 = x2 = ${x.toFixed(2)}.`;
    } else {
        const parteReal = (-b / (2 * a)).toFixed(2);
        const parteImaginaria = (Math.sqrt(-discriminante) / (2 * a)).toFixed(2);
        resultsDiv.textContent = `As raízes são complexas: x1 = ${parteReal} + ${parteImaginaria}i e x2 = ${parteReal} - ${parteImaginaria}i.`;
    }
}

// Função para gerar o gráfico da parábola
function exibirParabola() {
    const a = parseFloat(inputA.value);
    const b = parseFloat(inputB.value);
    const c = parseFloat(inputC.value);

    // Gerar os dados da parábola
    const xValues = [];
    const yValues = [];
    const range = 10; // Define a faixa de valores de x para o gráfico

    for (let x = -range; x <= range; x += 0.5) {
        const y = a * x * x + b * x + c;
        xValues.push(x);
        yValues.push(y);
    }

    // Destruir gráfico anterior, se existir
    if (parabolaChart) {
        parabolaChart.destroy();
    }

    // Criar novo gráfico usando Chart.js
    parabolaChart = new Chart(parabolaChartElement, {
        type: 'line',
        data: {
            labels: xValues, // Eixo X
            datasets: [
                {
                    label: 'Parábola',
                    data: yValues, // Eixo Y
                    borderColor: 'rgba(106, 79, 156, 1)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0 // Remove pontos extras no gráfico
                },
                {
                    label: 'Eixo X',
                    data: xValues.map(x => ({x: x, y: 0})),
                    borderColor: 'rgba(255, 99, 132, 0.7)',
                    borderWidth: 2,
                    borderDash: [10, 5], // Linha tracejada
                    pointRadius: 0,
                    fill: false,
                },
                {
                    label: 'Eixo Y',
                    data: yValues.map((y, i) => ({x: 0, y: yValues[i]})),
                    borderColor: 'rgba(75, 192, 192, 0.7)',
                    borderWidth: 2,
                    borderDash: [10, 5], // Linha tracejada
                    pointRadius: 0,
                    fill: false,
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Valor de X'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)' // Cor das linhas de grid
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor de Y'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)' // Cor das linhas de grid
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Gráfico da Equação de Segundo Grau'
                }
            }
        }
    });
}

// Adiciona eventos de clique aos botões
calculateBtn.addEventListener('click', calcularRaizes);
graphBtn.addEventListener('click', exibirParabola);
