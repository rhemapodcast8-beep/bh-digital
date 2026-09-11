'use client';

import { Modal } from './Modal';

interface ApoioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApoioModal({ isOpen, onClose }: ApoioModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Apoie o BH DIGITAL">
      <div className="space-y-6 text-center">
        <p className="text-sm text-slate-300">
          O BH DIGITAL nasceu com o propósito de disponibilizar conteúdos bíblicos, estudos, devocionais, materiais e ferramentas que possam servir à igreja e a todos que desejam conhecer mais a Palavra de Deus.
        </p>

        <div className="bg-white p-4 rounded-xl inline-block border-2 border-[#D4AF37]">
          <img
            src="/images/apoio/qr-code.png"
            alt="QR Code para apoiar o BH DIGITAL"
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
          />
        </div>

        <div className="space-y-2">
          <p className="text-base font-bold text-[#E5C05B]">
            Qualquer valor ajuda.
          </p>
          <p className="text-xs text-slate-400">
            Aponte a câmera do celular para o QR Code e contribua. Obrigado por apoiar este projeto.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-bold text-xs text-slate-900 bg-slate-200 hover:bg-white transition-colors"
          >
            FECHAR
          </button>
        </div>
      </div>
    </Modal>
  );
}
