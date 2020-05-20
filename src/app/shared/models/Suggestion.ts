import { EmoteEvaluation } from './EmoteEvaluation';

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
  status: number;
  numeroComentarios: number;
  numeroLikes: number;
  numeroDislikes: number;
}
