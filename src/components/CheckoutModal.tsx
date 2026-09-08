import React, { useState, useEffect } from "react";
import { X, CheckCircle, ArrowLeft, History } from "lucide-react";
import { useCart } from "../context/CartContext";
import { CustomerData } from "../types";
import { formatCurrency, generateWhatsAppLink } from "../utils";
import { motion, AnimatePresence } from "motion/react";

export function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, items, subtotal, markOrderSubmitted } = useCart();

  const [step, setStep] = useState<1 | 2>(1); // 1: Form, 2: Confirmation
  const [deliveryFee] = useState(0); // Fixed at 0 as requested

  const [hasSavedData, setHasSavedData] = useState(false);

  const [formData, setFormData] = useState<CustomerData>({
    name: "",
    orderType: "Entrega",
    address: "",
    addressNumber: "",
    addressComplement: "",
    neighborhood: "",
    paymentMethod: "Pix",
    changeFor: "",
    generalObservation: "",
  });

  useEffect(() => {
    if (isCheckoutOpen && step === 1) {
      const saved = localStorage.getItem('@brasa_massa_customer');
      if (saved) {
        setHasSavedData(true);
      }
    }
  }, [isCheckoutOpen, step]);

  const loadSavedData = () => {
    const saved = localStorage.getItem('@brasa_massa_customer');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsedData }));
        setHasSavedData(false);
      } catch (e) {
        console.error('Error loading saved data');
      }
    }
  };

  const total = subtotal + deliveryFee;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('@brasa_massa_customer', JSON.stringify({
      name: formData.name,
      orderType: formData.orderType,
      address: formData.address,
      addressNumber: formData.addressNumber,
      addressComplement: formData.addressComplement,
      neighborhood: formData.neighborhood,
      paymentMethod: formData.paymentMethod
    }));
    setStep(2);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: "100%", opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-bm-surface w-full h-[95vh] md:h-auto md:max-h-[90vh] md:max-w-2xl rounded-t-3xl md:rounded-2xl flex flex-col overflow-hidden shadow-2xl relative mt-auto sm:mt-0"
          >
            {/* Mobile Pull Indicator */}
            <div className="w-full flex justify-center pt-3 pb-1 sm:hidden absolute top-0 z-20">
              <div className="w-12 h-1.5 bg-bm-border rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between pt-6 pb-4 px-4 sm:p-6 border-b border-bm-border bg-bm-background flex-shrink-0 z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                {step === 2 && (
                  <button
                    onClick={() => setStep(1)}
                    className="text-bm-secondary-text hover:text-bm-dark-accent p-2 -ml-2 rounded-full active:bg-bm-surface transition-colors"
                  >
                    <ArrowLeft size={24} />
                  </button>
                )}
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-bm-dark-accent">
                  {step === 1 ? "Finalizar Pedido" : "Confira seu pedido"}
                </h2>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 text-bm-secondary-text hover:bg-bm-border rounded-full transition-colors active:scale-95"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-10">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    id="checkout-form"
                    onSubmit={handleReview}
                    className="space-y-6 sm:space-y-8"
                  >
                    <AnimatePresence>
                      {hasSavedData && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          className="bg-bm-primary-accent/10 border border-bm-primary-accent/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-bm-primary-accent text-white p-2 rounded-lg flex-shrink-0">
                              <History size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-bm-dark-accent text-sm">Preencher automaticamente?</p>
                              <p className="text-xs text-bm-secondary-text">Encontramos dados da sua última compra.</p>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={() => setHasSavedData(false)}
                              className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold text-bm-secondary-text hover:bg-black/5 rounded-lg transition-colors"
                            >
                              Não
                            </button>
                            <button
                              type="button"
                              onClick={loadSavedData}
                              className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold bg-bm-primary-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
                            >
                              Preencher
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="font-bold text-bm-dark-accent border-b border-bm-border pb-2 text-sm sm:text-base">
                        Dados do Cliente
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-bm-secondary-text mb-1">
                          Seu nome *
                        </label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border border-bm-border rounded-xl p-3 sm:p-4 bg-white focus:ring-2 focus:ring-bm-primary-accent outline-none text-base transition-shadow"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="font-bold text-bm-dark-accent border-b border-bm-border pb-2 text-sm sm:text-base">
                        Como deseja receber?
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-bm-secondary-text mb-1">
                          Tipo de pedido *
                        </label>
                        <select
                          required
                          name="orderType"
                          value={formData.orderType}
                          onChange={handleChange}
                          className="w-full border border-bm-border rounded-xl p-3 sm:p-4 bg-white focus:ring-2 focus:ring-bm-primary-accent outline-none text-base transition-shadow"
                        >
                          <option value="Entrega">Entrega</option>
                          <option value="Retirada no local">
                            Retirada no local
                          </option>
                        </select>
                      </div>

                      {formData.orderType === "Entrega" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-2"
                        >
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-bm-secondary-text mb-1">
                              Endereço de entrega *
                            </label>
                            <input
                              required
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              className="w-full border border-bm-border rounded-xl p-3 sm:p-4 bg-white focus:ring-2 focus:ring-bm-primary-accent outline-none text-base transition-shadow"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-bm-secondary-text mb-1">
                              Número *
                            </label>
                            <input
                              required
                              type="text"
                              name="addressNumber"
                              value={formData.addressNumber}
                              onChange={handleChange}
                              className="w-full border border-bm-border rounded-xl p-3 sm:p-4 bg-white focus:ring-2 focus:ring-bm-primary-accent outline-none text-base transition-shadow"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-bm-secondary-text mb-1">
                              Bairro *
                            </label>
                            <input
                              required
                              type="text"
                              name="neighborhood"
                              value={formData.neighborhood}
                              onChange={handleChange}
                              className="w-full border border-bm-border rounded-xl p-3 sm:p-4 bg-white focus:ring-2 focus:ring-bm-primary-accent outline-none text-base transition-shadow"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-bm-secondary-text mb-1">
                              Complemento
                            </label>
                            <input
                              type="text"
                              name="addressComplement"
                              value={formData.addressComplement}
                              onChange={handleChange}
                              placeholder="Ex: Apto 101, Bloco B"
                              className="w-full border border-bm-border rounded-xl p-3 sm:p-4 bg-white focus:ring-2 focus:ring-bm-primary-accent outline-none text-base transition-shadow"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="font-bold text-bm-dark-accent border-b border-bm-border pb-2 text-sm sm:text-base">
                        Pagamento
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-bm-secondary-text mb-1">
                          Forma de pagamento *
                        </label>
                        <select
                          required
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleChange}
                          className="w-full border border-bm-border rounded-xl p-3 sm:p-4 bg-white focus:ring-2 focus:ring-bm-primary-accent outline-none text-base transition-shadow"
                        >
                          <option value="Pix">Pix</option>
                          <option value="Cartão de crédito">
                            Cartão de crédito
                          </option>
                          <option value="Cartão de débito">
                            Cartão de débito
                          </option>
                          <option value="Dinheiro">Dinheiro</option>
                        </select>
                      </div>

                      {formData.paymentMethod === "Dinheiro" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                        >
                          <label className="block text-sm font-medium text-bm-secondary-text mb-1">
                            Troco para quanto?
                          </label>
                          <input
                            type="number"
                            name="changeFor"
                            value={formData.changeFor}
                            onChange={handleChange}
                            placeholder="Ex: 100"
                            className="w-full border border-bm-border rounded-xl p-3 sm:p-4 bg-white focus:ring-2 focus:ring-bm-primary-accent outline-none text-base transition-shadow"
                          />
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="font-bold text-bm-dark-accent border-b border-bm-border pb-2 text-sm sm:text-base">
                        Observação Geral
                      </h3>
                      <textarea
                        name="generalObservation"
                        value={formData.generalObservation}
                        onChange={handleChange}
                        placeholder="Ex: Tocar a campainha, enviar talheres..."
                        className="w-full border border-bm-border rounded-xl p-3 sm:p-4 bg-white focus:ring-2 focus:ring-bm-primary-accent outline-none resize-none h-24 text-base transition-shadow"
                      ></textarea>
                    </div>
                  </motion.form>
                ) : (
                  // Step 2: Confirmation
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-5 sm:space-y-6"
                  >
                    <p className="text-bm-secondary-text bg-bm-background p-4 rounded-xl border border-bm-border flex items-start gap-3 text-sm sm:text-base">
                      <CheckCircle
                        className="text-green-600 flex-shrink-0 mt-0.5"
                        size={20}
                      />
                      <span>
                        Quase lá, <strong>{formData.name}</strong>! Revise as
                        informações abaixo antes de enviar.
                      </span>
                    </p>

                    <div className="bg-white border border-bm-border rounded-xl p-4 sm:p-5 space-y-4 shadow-sm">
                      <h4 className="font-bold text-bm-dark-accent">
                        Resumo do Pedido
                      </h4>
                      <div className="space-y-2 text-sm text-bm-secondary-text divide-y divide-bm-border">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="py-2 flex justify-between"
                          >
                            <div className="pr-4">
                              <span className="font-bold text-bm-dark-accent">
                                {item.quantity}x {item.name}
                              </span>
                              {item.size && (
                                <span className="block text-xs mt-0.5">
                                  Tam: {item.size}
                                </span>
                              )}
                              {item.extras.length > 0 && (
                                <span className="block text-xs mt-0.5">
                                  Add: {item.extras.join(", ")}
                                </span>
                              )}
                            </div>
                            <span className="font-medium text-bm-dark-accent">
                              {formatCurrency(item.finalPrice * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-bm-border rounded-xl p-4 sm:p-5 space-y-3 text-sm shadow-sm">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-bm-secondary-text">Entrega:</span>
                        <span className="col-span-2 font-medium text-bm-dark-accent">
                          {formData.orderType}
                          {formData.orderType === "Entrega" &&
                            ` - ${formData.address}, ${formData.addressNumber}`}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-bm-secondary-text">
                          Pagamento:
                        </span>
                        <span className="col-span-2 font-medium text-bm-dark-accent">
                          {formData.paymentMethod}
                        </span>
                      </div>
                    </div>

                    <div className="bg-bm-background border border-bm-border rounded-xl p-4 sm:p-5 space-y-2">
                      <div className="flex justify-between text-bm-secondary-text text-sm sm:text-base">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-bm-secondary-text text-sm sm:text-base">
                        <span>Taxa de entrega</span>
                        <span>{formatCurrency(deliveryFee)}</span>
                      </div>
                      <div className="flex justify-between text-lg sm:text-xl font-bold text-bm-dark-accent pt-2 border-t border-bm-border mt-2">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-bm-border bg-bm-background flex-shrink-0 safe-area-bottom pb-6 sm:pb-6">
              {step === 1 ? (
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full bg-bm-primary-accent text-white font-bold py-4 sm:py-4 px-6 rounded-xl hover:bg-opacity-90 transition-colors active:scale-95 text-base"
                >
                  Revisar Pedido
                </button>
              ) : (
                <a
                  href={generateWhatsAppLink(
                    items,
                    formData,
                    subtotal,
                    deliveryFee,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => markOrderSubmitted()}
                  className="w-full bg-[#25D366] text-white font-bold py-4 sm:py-4 px-6 rounded-xl hover:bg-[#1DA851] transition-colors flex items-center justify-center gap-2 active:scale-95 text-base"
                >
                  Enviar pedido pelo WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
