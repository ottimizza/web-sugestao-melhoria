import { EmoteEvaluation } from './EmoteEvaluation';

export class Vote {

  sugestaoId: number;
  usuario: string;
  comentario: string;
  aprovado: boolean; // like (true), dislike (false)
  resultadoSuporte: EmoteEvaluation;
  resultadoProdutividade: EmoteEvaluation;
  resultadoAutomacao: EmoteEvaluation;

}
