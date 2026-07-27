import {
	CalendarClock,
	CreditCardIcon,
	Download,
	Goal,
	Landmark,
	PiggyBank,
	Wallet,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import { AIInsightsCard } from '@/components/features/SimulationResults/AIInsightCardProps';
import { Card } from '@/components/features/SimulationResults/Card';
import { PageHero } from '@/components/shared/PageHero';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { calcMonthlySavings } from '@/utils/simulation';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export function SimulationResultsPage() {
	const { id } = useParams<{ id: string }>();
	const { getFormData } = useSimulationStorage();

	const data = id ? getFormData(id) : null;

	if (!data) {
		return <p>Simulação não encontrada.</p>;
	}

	const monthlySavings = calcMonthlySavings(data);

	const contentRef = useRef<HTMLDivElement>(null);

	// Função para lidar com a impressão do PDF
	const handlePrint = useReactToPrint({
		contentRef: contentRef,
		documentTitle: 'Relatorio_Educador_Financeiro',
	});

	return (
		<main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
			{/* 1. O Botão de Download */}
			<div className="mb-8 flex justify-end">
				<button
					onClick={() => handlePrint()}
					className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
				>
					<Download size={18} />
					Baixar Relatório
				</button>
			</div>

			<div ref={contentRef}>
				<PageHero
					title="Resultado da sua simulação"
					subtitle="Com base no seu perfil financeiro e objetivos."
				/>

				<div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3 print:grid-cols-3">
					<Card
						icon={Goal}
						label="Custo da Meta"
						value={data.goalAmount}
						subtitle={data.goalName}
					/>
					<Card
						icon={CalendarClock}
						label="Prazo"
						value={`${data.goalDeadline} meses`}
						subtitle={'Prazo para atingir a meta'}
					/>
					<Card
						variant="primary"
						icon={PiggyBank}
						label="Economia mensal"
						value={`R$ ${monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
						subtitle={'Economia mensal necessária'}
					/>
				</div>

				<div className="grid gap-6 lg:grid-cols-3 print:flex print:flex-col print:gap-4">
					<div className="order-1 flex flex-col gap-4 lg:order-2 print:order-1 print:grid print:grid-cols-3">
						<Card
							icon={Wallet}
							label="Renda mensal"
							value={data.income}
							subtitle={'Renda total bruta por mês'}
						/>
						<Card
							icon={CreditCardIcon}
							label="Custos Fixos de Vida"
							value={data.expenses}
							subtitle={'Gastos essenciais por mês'}
						/>
						<Card
							icon={Landmark}
							label="Dívidas / Parcelas"
							value={data.debts}
							subtitle={'Valor comprometido em parcelas/depósito'}
						/>
					</div>

					{/* CARD DA IA (Insight) */}
					<div className="lg:col-span-2 print:order-2 print:break-before-page print:pt-8">
						<AIInsightsCard simulationId={data.id} />
					</div>
				</div>
			</div>
		</main>
	);
}
