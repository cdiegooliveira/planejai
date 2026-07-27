import { calcMonthlySavings } from '@/utils/simulation'; // 1. Importando a função de cálculo de economia
import { ArrowLeft, Frown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HistoryCard } from '../components/features/History/HistoryCard';

// 2. Tipagem: Definimos o formato dos dados que estão salvos lá no Local Storage
// 1. Tipagem atualizada para aceitar o formato completo exigido pela função de cálculo
interface SimulationData {
	id: string;
	goalName: string;
	goalAmount: string | number;
	goalDeadline: string | number;
	income: string | number;
	expenses: string | number;
	debts: string | number;
	[key: string]: any; // <-- Essa linha é o "coringa" que diz ao TypeScript para não reclamar de propriedades extras
}

export function SimulationHistoryPage() {
	// 3. Estado: Guarda a nossa lista de simulações. Começa como um array vazio [].
	const [simulations, setSimulations] = useState<SimulationData[]>([]);

	// 4. Efeito de Carregamento: Roda uma única vez quando a página abre.
	useEffect(() => {
		// Vai no navegador e busca o texto salvo na chave 'simulation-data'
		const storedData = localStorage.getItem('simulation-data');

		if (storedData) {
			// Se achou, transforma o texto de volta em um Array do JavaScript e salva no estado
			setSimulations(JSON.parse(storedData));
		}
	}, []);

	// 5. A Função de Excluir (Aquela que passamos para o Card!)
	const handleDelete = (idToRemove: string) => {
		// Cria uma NOVA lista contendo apenas os itens que têm o ID diferente do que queremos apagar
		const updatedList = simulations.filter((sim) => sim.id !== idToRemove);

		// Atualiza a tela imediatamente
		setSimulations(updatedList);

		// Salva a nova lista (sem o item apagado) de volta no navegador
		localStorage.setItem('simulation-data', JSON.stringify(updatedList));
	};

	return (
		<div className="mx-auto w-full max-w-6xl space-y-8 px-6 pt-12">
			{/* Cabeçalho da Página */}
			<div className="flex items-center justify-between">
				<h1 className="text-foreground text-3xl font-bold">
					Histórico de Simulações
				</h1>
				<Link
					to="/"
					className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
				>
					<ArrowLeft size={16} />
					Nova Simulação
				</Link>
			</div>

			{/* Renderização Condicional: Tem dados ou está vazio? */}
			{simulations.length === 0 ? (
				// Tela Vazia (Empty State)
				<div className="flex flex-col items-center justify-center space-y-4 py-20 text-center">
					<Frown size={48} className="text-muted-foreground/50" />
					<p className="text-muted-foreground text-lg">
						Você ainda não possui nenhuma simulação salva.
					</p>
				</div>
			) : (
				// Grid com os Cards
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{simulations.map((sim) => {
						// Calculando a economia mensal real usando a função utilitária
						const savings = calcMonthlySavings(sim);
						const formattedSavings = `R$ ${savings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

						return (
							<HistoryCard
								key={sim.id}
								id={sim.id}
								titulo={sim.goalName}
								custoMeta={sim.goalAmount}
								prazo={sim.goalDeadline}
								// Passando o valor real formatado em Reais
								economiaMensal={formattedSavings}
								onDelete={handleDelete}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
