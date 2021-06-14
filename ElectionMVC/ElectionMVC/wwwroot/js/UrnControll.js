class UrnControll{
    constructor(ApiUrl){
        this._ApiUrl = ApiUrl;
        this._digitedNumbers = [];
        this.Candidates = [];
        this._candidateSelected = null;
    }

    Init = function(){
        $.ajax({
            url:`${this._ApiUrl}/api/Candidate/Candidates`,
            success: (data)=>{
                if(data.length < 1)
                    toastr.warning('Não há candidatos cadastrados');
                this.Candidates = data;
            },
            error: function(data){
                toastr.warning('Não há candidatos cadastrados');
            }
        });
        this.InitEvents();
    }

    InitEvents(){
        var self = this;
        $('.button-number').on('click',function(){
            if(self._digitedNumbers.length > 1)
                return;
        
            if(self._digitedNumbers.length == 0 && this.innerText == 0)
                    return;

            self._digitedNumbers.push(this.innerText);
            if(self._digitedNumbers.length ==2)
                self.FindCandidate(self._digitedNumbers.join(''));

            self.InputNumber(self._digitedNumbers.join(''))
        })
        $('.button-corrige').on('click',function(){
            self._digitedNumbers = [];
            self.ClearScreen();
        })
        $('.button-branco').on('click', function () {

            $.confirm({
                title: 'Confirme o voto',
                content: `Tem certeza que deseja votar em branco?`,
                buttons: {
                    confirm: {
                        btnClass: 'btn-success',
                        text: 'Continuar',
                        action: function () {
                            self.Vote(1);
                        }
                    },
                    cancel: {
                        btnClass: 'btn-danger',
                        text: 'Cancelar'
                    },
                }
            });
        })
        $('#ShowCandidateList').on('click', function () {
            self.ShowList();
            $('.fab').removeClass('show');
            $('.rotate').removeClass('rotate');
        })
        $('.button-confirma').on('click', function () {
            if (self._candidateSelected == null) {
                toastr.info('Não existe um candidato com o número informado');
                return;
            }


            $.confirm({
                title: 'Confirme o voto',
                content: `Tem certeza que deseja votar em: ${self._candidateSelected.name}?`,
                buttons: {
                    confirm: {
                        btnClass: 'btn-success',
                        text: 'Continuar',
                        action: function () {
                            self.Vote(self._candidateSelected.candidateID);
                        }
                    },
                    cancel: {
                        btnClass: 'btn-danger',
                        text: 'Cancelar'
                    },
                }
            });
        })
    }

    FindCandidate(candidateNumber){
        this._candidateSelected = this.Candidates.find(x=>x.legend == candidateNumber);
        if (this._candidateSelected == null)
            return;

        this.FillScreen(this._candidateSelected);
    }

    InputNumber(legend){
        $('#CandidateNumber').text(legend); 
    }    

    FillScreen(candidate){
        $('#CandidateNumber').text(candidate.legend);   
        $('#CandidateName').text(candidate.name);   
        $('#CandidateVice').text(candidate.vice);
        $('#CandidateAffiliation').text(candidate.affiliation);
    }

    ClearScreen(){
        this._candidateSelected = null;
        $('#CandidateNumber').text('');   
        $('#CandidateName').text('');   
        $('#CandidateVice').text('');
        $('#CandidateAffiliation').text('');
    }

    ShowList() {
        $('#PnlCandidatos').remove();
        var tbody =
            this.Candidates.map(x => `
            <tr>
                <td class="col-4">${x.legend}</td>
                <td class="col-8">${x.name}</td>
            </tr>
        `).join('');

        var content = 
            `<table class="table table-bordered">
                <thead>
                    <tr>
                        <td style="text-align: center;">Legenda</td>
                        <td>Nome</td>
                    </tr>
                </thead>
                <tbody>
                    ${tbody}
                </tbody>
            </table>`


        jsPanel.create({
            id: 'PnlCandidatos',
            headerTitle: 'Candidatos',
            headerControls: {
                minimize: 'remove',
                smallify: 'remove',
                maximize: 'remove'
            },
            theme: 'purple',
            callback: function () {
                this.content.innerHTML = (content);
            }
        });

    }

    Vote(number) {
        $.ajax({
            method: 'POST',
            url: `${this._ApiUrl}/api/vote/vote?CandidateID=${number}`,
            success: () => {
                toastr.success('Voto confirmado com sucesso');
                this._digitedNumbers = [];
                this.ClearScreen();
                this._candidateSelected = null;
            },
            error: () => {
                toastr.error('Não foi possível identificar o candidato');
            }
        });
    }
}