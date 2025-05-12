import streamlit as st
import pandas as pd
import numpy as np
import time

# 1. TITULOS E MARKDOWN
st.title("Explorador de Dados com Streamlit")
st.header("Módulo 15 – Tarefa 1")
st.subheader("Profissão Cientista de Dados")
st.markdown("---")
st.markdown("Aplicação baseada em exemplos oficiais da documentação do [Streamlit](https://docs.streamlit.io)")
st.markdown("**Markdown com negrito**, *itálico*, __*misturado*__, e emojis :sunglasses: :chart_with_upwards_trend:")
st.markdown("<h3 style='color: green;'>Título Customizado em HTML</h3>", unsafe_allow_html=True)

# 2. INTERAÇÕES BÁSICAS
nome = st.text_input("Digite seu nome")
if nome:
    st.success(f"Olá, {nome}! Seja bem-vindo(a).")

escolha = st.selectbox("Escolha um número", [10, 20, 30])
st.write(f"Você escolheu: {escolha}")

ativado = st.checkbox("Ativar filtro de dados")
if ativado:
    st.info("Filtro ativado!")

x = st.slider('Escolha um valor de X:', 0, 100, 50)
st.write(f"{x} ao quadrado é {x**2}")

# 3. EXIBIÇÃO DE DADOS
st.markdown("### Tabela Aleatória")
df_random = pd.DataFrame(np.random.randn(10, 5), columns=[f'Col_{i}' for i in range(5)])
st.dataframe(df_random)
st.table(df_random.head())

st.markdown("### Destaque dos maiores valores")
st.dataframe(df_random.style.highlight_max(axis=0))

# 4. CHARTS E MAPS
st.markdown("### Gráfico de Linhas")
chart_data = pd.DataFrame(np.random.randn(20, 3), columns=['a', 'b', 'c'])
st.line_chart(chart_data)

st.markdown("### Mapa com Coordenadas Aleatórias")
map_data = pd.DataFrame(np.random.randn(1000, 2) / [50, 50] + [ -10.2, -60.6], columns=['lat', 'lon'])
st.map(map_data)

# 5. UPLOAD DO CSV
st.markdown("### Upload de Arquivo")
file = st.file_uploader("Carregue o arquivo .csv do SINASC_RO_2019")
if file:
    df_sinasc = pd.read_csv(file)
    st.success("Arquivo carregado com sucesso!")
    st.dataframe(df_sinasc.head())

# 6. CACHE
@st.cache_data
def calcular_media_coluna(df, coluna):
    return df[coluna].mean()

if file:
    media_idade = calcular_media_coluna(df_sinasc, 'IDADEMAE')
    st.write(f"Média de idade das mães: {media_idade:.2f}")

# 7. SESSION STATE
if 'contador' not in st.session_state:
    st.session_state.contador = 0

if st.button("Clique para somar 1"):
    st.session_state.contador += 1
st.write(f"Contador: {st.session_state.contador}")

# 8. PROGRESS BAR
st.markdown("### Simulação de carregamento")
bar = st.progress(0)
status = st.empty()
for i in range(100):
    bar.progress(i + 1)
    status.text(f"Carregando... {i+1}%")
    time.sleep(0.01)
st.success("Carregamento completo!")

# 9. CONTAINERS, COLUMNS E EXPANDER
st.markdown("### Layout com colunas")
col1, col2 = st.columns(2)
col1.metric("Temperatura", "25°C", "+1.2")
col2.metric("Umidade", "68%", "-3%")

with st.expander("Clique para ver detalhes"):
    st.write("Aqui vão informações adicionais que podem ser ocultadas.")

# 10. FIM
st.markdown("---")
st.markdown("App Teste curso de Cientista de Dados – M15")
