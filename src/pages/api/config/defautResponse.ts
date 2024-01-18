function defautResponse(status: number, mensagem: string, conteudo: any) {
    return {
        status: status,
        mensagem: mensagem,
        conteudo: conteudo
    }
}

export default defautResponse;