/**
 * Appeler la première fonction dès le chargement du "dom"
 */
// Attendre que le dom soit chargé
window.onload = () => {
    console.log("Dom is loaded");
    getOrderId();
  };
  
  /**
   * Récupérer l'identifiant du produit
   */
  // Fonction de récuperation et d'affichage de l'identifiant
  const getOrderId = () => {
  // Récuperer le numéro de commande dans l'url
    const orderId = new URLSearchParams(window.location.search).get("orderId");
    console.log(orderId)
  // Afficher le numéro dans le dom
    document.getElementById("orderId").textContent = orderId
  };

