<template>
	<div class="arial row inline full-width no-wrap q-pt-md">
		<div class="col-4">Assinatura: mindstation anual</div>	
		<div class="col-4">Início: 01/12/2021</div>
		<div class="col-4">Próxima cobrança: 01/01/2022</div>	
	</div>
	<div class="arial row inline full-width">
		<div class="col-auto" style="padding-top:2px;">Método de Pagamento: .... 4354</div>
		<div class="col inline q-pt-none">
			<q-btn flat dense unelevated type="a" to="/admin/" class="text-weight-thin text-lowercase text-blue q-pl-lg q-pt-none">Alterar</q-btn>
		</div>	
	</div>
	<div class="arial row inline full-width">
		<div class="col-auto q-pr-xs">
			<q-btn flat dense unelevated type="a" to="/admin/" class="text-weight-thin text-capitalize text-blue q-pl-none">Alterar assinatura</q-btn>
		</div>	
		<div class="col-auto q-pr-xs">
			<q-btn flat dense unelevated type="a" to="/admin/" class="text-weight-thin text-capitalize text-blue q-pl-none">Cancelar assinatura</q-btn>
		</div>	
	</div>
</template>