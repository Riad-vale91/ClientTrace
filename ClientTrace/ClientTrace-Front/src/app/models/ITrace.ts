export interface ITrace{
    [key: string]: any;
    id: number;
    dataOra: Date;
    societa?: string;
    agenzia?: string;
    nomeApplicazione?: string; 
    utente?: string;
    pagina?: string;
    descrizione?: string;
    idTipoTraccia?: number;
    idTracerCategories?: number;

}