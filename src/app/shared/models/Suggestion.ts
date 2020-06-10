import { EmoteEvaluation } from './EmoteEvaluation';

export enum SuggestionStatus {

  ABERTO = 1,
  ARQUIVADO,
  APROVADO

}

export class Suggestion {
  id: number;
  dataCriacao: string;
  dataAtualizacao: string;
  topicoId: number;
  usuario: string;
  titulo: string;
  descricaoSugestao: string; // sugestão de melhoria
  problemaResolvido: string; // problema a ser resolvido
  resultadoSuporte: EmoteEvaluation;
  resultadoProdutividade: EmoteEvaluation;
  resultadoAutomacao: EmoteEvaluation;
  status: SuggestionStatus;
  numeroComentarios: number;
  numeroLikes: number;
  numeroDislikes: number;
  userId: number;
  deuLike: boolean;
  deuDislike: boolean;
}
