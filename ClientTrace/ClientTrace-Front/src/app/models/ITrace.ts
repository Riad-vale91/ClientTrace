export interface ITrace{
    Id: number;
    DataOra: Date;
    Societa?: string;
    Agenzia?: string;
    NomeApplicazione?: string; 
    Utente?: string;
    Pagina?: string;
    Descrizione?: string;
    IdTipoTraccia?: number;
    IdTracerCategories?: number;

}