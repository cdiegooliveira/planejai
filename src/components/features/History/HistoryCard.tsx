import { Calendar, Eye, Target, Trash2, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

// 1. O Contrato (Interface): Aqui definimos exatamente o que esse card espera receber.
export interface HistoryCardProps {
	id: string;
	titulo: string;
	custoMeta: string | number;
	prazo: string | number;
	economiaMensal: string | number;
	onDelete: (id: string) => void;
}

export function HistoryCard({
	id,
	titulo,
	custoMeta,
	prazo,
	economiaMensal,
	onDelete,
}: HistoryCardProps) {
	return (
		<div className="bg-card flex flex-col gap-4 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
			{/* 3. Cabeçalho: O título da meta */}
			<div className="border-border/50 border-b pb-3">
				<h3 className="text-foreground text-xl font-bold">{titulo}</h3>
			</div>

			{/* 4. Corpo: Lista com as informações usando os ícones do Lucide */}
			<div className="flex flex-col gap-3">
				{/* Item 1: Custo */}
				<div className="flex items-center gap-2">
					<Target size={18} className="text-primary" />
					<span className="text-muted-foreground text-sm">
						Custo: <strong className="text-foreground">{custoMeta}</strong>
					</span>
				</div>

				{/* Item 2: Prazo */}
				<div className="flex items-center gap-2">
					<Calendar size={18} className="text-primary" />
					<span className="text-muted-foreground text-sm">
						Prazo: <strong className="text-foreground">{prazo} meses</strong>
					</span>
				</div>

				{/* Item 3: Economia */}
				<div className="flex items-center gap-2">
					<Wallet size={18} className="text-primary" />
					<span className="text-muted-foreground text-sm">
						Economia:{' '}
						<Link
							to={`/resultado/${id}`}
							className="text-primary font-semibold transition-all hover:underline"
						>
							{economiaMensal}
						</Link>
					</span>
				</div>
			</div>
			{/* 5. Rodapé: Os botões de ação alinhados à direita (justify-end) */}
			<div className="mt-2 flex items-center justify-end gap-3 pt-2">
				{/* Botão de Excluir */}
				<button
					onClick={() => onDelete(id)}
					className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
				>
					<Trash2 size={16} />
					Excluir
				</button>

				{/* Botão de Visualizar (React Router Link) */}
				<Link
					to={`/resultado/${id}`}
					className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
				>
					<Eye size={16} />
					Visualizar
				</Link>
			</div>
		</div>
	);
}
