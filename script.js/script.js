document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const calculateButton = document.getElementById('calculateButton');
    const payButton = document.getElementById('payButton');
    const resultContainer = document.getElementById('resultContainer');
    const successModal = document.getElementById('successModal');
    const modalContent = document.getElementById('modalContent');
    
    let currentTotal = 0;

    window.showSuccessModal = () => {
        successModal.classList.remove('hidden');
        setTimeout(() => {
            modalContent.classList.remove('opacity-0', 'scale-95');
            modalContent.classList.add('opacity-100', 'scale-100');
        }, 10);
    };

    window.hideSuccessModal = () => {
        modalContent.classList.remove('opacity-100', 'scale-100');
        modalContent.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            successModal.classList.add('hidden');
            resetState();
        }, 300);
    };

    const resetState = () => {
        amountInput.value = '';
        calculateButton.style.display = 'block';
        payButton.style.display = 'none';
        currentTotal = 0;
        resultContainer.innerHTML = `
            <p class="text-gray-300 text-lg">
                Los detalles de la transacción aparecerán aquí después del cálculo.
            </p>
            <p class="text-xs text-gray-500 mt-2">(Propina Fija: 10%)</p>
        `;
    };

    resetState();

    calculateButton.addEventListener('click', async () => {
        const amount = parseFloat(amountInput.value);
        
        if (isNaN(amount) || amount <= 0) {
            resultContainer.innerHTML = '<div class="p-4 bg-red-900 border border-red-700 text-red-300 rounded-lg text-center font-medium">Por favor, ingresa un monto válido.</div>';
            payButton.style.display = 'none';
            return;
        }

        resultContainer.innerHTML = '<div class="flex justify-center items-center p-4 text-gray-300"><svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Calculando...</div>';

        try {
            const tipRate = 0.10;
            const tipAmount = amount * tipRate;
            const totalAmount = amount + tipAmount;
            currentTotal = totalAmount;

            const tipDisplay = tipAmount.toFixed(2);
            const totalDisplay = totalAmount.toFixed(2);
            const amountDisplay = amount.toFixed(2);

            await new Promise(resolve => setTimeout(resolve, 500));

            resultContainer.innerHTML = `
                <div class="p-5 bg-cyan-900 border-l-4 border-cyan-700 rounded-lg shadow-2xl text-left">
                    <p class="text-2xl font-bold text-cyan-300 mb-2">Resumen de Propina</p>
                    <hr class="border-gray-700 mb-3" />
                    <div class="space-y-2 text-gray-200">
                        <p class="flex justify-between">
                            Monto Original: 
                            <span class="font-semibold text-white">$${amountDisplay}</span>
                        </p>
                        <p class="flex justify-between">
                            Propina (10%): 
                            <span class="font-semibold text-cyan-400">$${tipDisplay}</span>
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700 flex justify-between items-center">
                        <p class="text-xl font-extrabold text-white">Total a Pagar:</p> 
                        <p class="text-3xl font-extrabold text-cyan-400">$${totalDisplay}</p>
                    </div>
                </div>
                <div class="mt-6 p-4 bg-gray-700 rounded-lg text-center font-medium text-gray-200 shadow-md">
                    Presiona 'Pagar Total' para finalizar la transacción.
                </div>
            `;
            
            calculateButton.style.display = 'none';
            payButton.style.display = 'block';
        } catch (error) {
            console.error('Error al calcular:', error);
            resultContainer.innerHTML = `
                <div class="p-4 bg-red-900 border border-red-700 text-red-300 rounded-lg text-center font-medium">
                    Error interno al realizar el cálculo.
                </div>
            `;
            payButton.style.display = 'none';
            calculateButton.style.display = 'block';
        }
    });

    payButton.addEventListener('click', () => {
        if (currentTotal > 0) {
            showSuccessModal();
        } else {
            resultContainer.innerHTML = '<div class="p-4 bg-red-900 border border-red-700 text-red-300 rounded-lg text-center font-medium">Por favor, calcula el monto primero.</div>';
            payButton.style.display = 'none';
            calculateButton.style.display = 'block';
        }
    });
});
