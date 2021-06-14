class ManageCandidates {
    constructor(ApiUrl) {
        this._ApiUrl = ApiUrl;
    }

    Init = function(){
        this.InitEvents();
        this.candidates = [];
        this.GetCandidates();
    }

    GetCandidates() {
        $.ajax({
            url: `${this._ApiUrl}/api/candidate/candidates`,
            success: (data)=>{
                this.candidates = data;
                $('tbody').empty();
                if (data == null || data.length == 0) {
                    toastr.warning('Não há nenhum candidato inserido');
                    return;
                }
                $('tbody').append(data.map(
                x => `
                    <tr>
                        <td class="col-2">${x.legend}</td>
                        <td class="col-2">${x.affiliation}</td>
                        <td class="col-3">${x.name}</td>
                        <td class="col-3">${x.vice}</td>
                        <td class="col-2" style="text-align:center"><i class="fas fa-trash-alt" CandidateID="${x.candidateID}" style="cursor:pointer;"></td>
                    </tr>
                `).join(''));
            }
        });
    }

    InitEvents() {
        var self = this;
        $('#AddCandidate').on('click', function () {
            var content = `
                <div class="form p-3 m-0">
                    <div class="form-row mb-2">
                        <div class="mr-2 col-2"><label for="NameInput">Nome: </label></div>
                        <div class="col"><input id="NameInput" class="form-control form-control-sm"></div>
                    </div><div class="form-row mb-2">
                        <div class="mr-2 col-2"><label for="ViceInput">Vice:</label></div>
                        <div class="col"><input id="ViceInput" class="form-control form-control-sm"></div>
                    </div><div class="form-row mb-2">
                        <div class="mr-2 col-2"><label for="LegendInput">Legenda:</label></div>
                        <div class="col"><input id="LegendInput" class="form-control form-control-sm" type="number" max="99" min="10"></div>
                    </div><div class="form-row mb-2">
                        <div class="mr-2 col-2"><label for="AffiliationInput">Partido:</label></div>
                        <div class="col"><input id="AffiliationInput" class="form-control form-control-sm"></div>
                    </div>
                    <div class="form-row justify-content-end">
                        <button class="btn btn-success" id="FinishCandidateInsert">Adicionar</button>
                    </div>
                </div>
            `;
            jsPanel.create({
                id: 'PnlFormAddCandidate',
                headerTitle: 'Adicionar',
                headerControls: {
                    minimize: 'remove',
                    smallify: 'remove',
                    maximize: 'remove'
                },
                theme: 'purple',
                panelSize: {
                    width: '30rem',
                    height: '16.3rem'
                },
                resizeit: false,
                callback: function () {
                    this.content.innerHTML = (content);
                    $('#FinishCandidateInsert').on('click', function () {
                        var model = {
                            Name: $('#NameInput').val(),
                            Vice: $('#ViceInput').val(),
                            Legend: $('#LegendInput').val(),
                            Affiliation: $('#AffiliationInput').val()?.toUpperCase(),
                        };

                        self.AddNewCandidate(model);
                    })
                }
            });
        })
        $(document.body).on('click', '.fa-trash-alt', function () {


            $.confirm({
                title: 'Confirme a exclusão',
                content: `Tem certeza que deseja excluir o candidato: ${self.candidates.find(x => x.candidateID == this.getAttribute('candidateid')).name}?`,
                buttons: {
                    confirm: {
                        text: 'Continuar',
                        btnClass: 'btn-success',
                        action: ()=>{
                            self.Delete(this.getAttribute('candidateid'));
                        }
                    },
                    cancel: {
                        btnClass: 'btn-danger',
                        text: 'Cancelar'
                    },
                }
            });
        });
    }

    Delete(candidateID) {
        $.ajax({
            method: 'DELETE',
            url: `${this._ApiUrl}/api/Candidate/Candidate?CandidateID=${candidateID}`,
            success: () => {
                toastr.success('Candidato excluído com sucesso');
                this.GetCandidates();
            },
            error: function () {
                toastr.error('Não foi possível excluir o candidato');
            }
        });
    }

    AddNewCandidate(model) {
        if (model.Name == '') {
            toastr.warning('O nome do candidato não é válido');
            return;
        }

        if (model.Vice == '') {
            toastr.warning('O nome do vice não é válido');
            return;
        }

        if (model.Legend == '' || model.Legend > 99 || model.Legend < 10) {
            toastr.warning('O número da legenda não é válido');
            return;
        }

        if (model.Affiliation == '') {
            toastr.warning('O nome do partido não é válido');
            return;
        }

        if (this.candidates.find(x => x.affiliation == model.Affiliation) != null) {
            toastr.warning('Já existe um candidato do partido informado');
            return;
        }

        if (this.candidates.find(x => x.legend == model.Legend) != null) {
            toastr.warning('Já existe um candidato com a legenda informada');
            return;
        }

        $.ajax({
            method: 'POST',
            url: `${this._ApiUrl}/api/Candidate/Candidate`,
            data: JSON.stringify(model),
            contentType: 'application/json',
            success: () => {
                toastr.success('Candidato adicionado');
                $('#PnlFormAddCandidate').remove();
                this.GetCandidates();
            },
            error: function () {
                toastr.error('Não foi possível adicionar o candidato');
            }
        })
    }
}