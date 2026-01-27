<script>
    let cartCount = 0;
    let totalPrice = 0;

    // ခလုတ်အားလုံးကို Select လုပ်တယ်
    const addButtons = document.querySelectorAll('.add-to-cart');
    const cartDisplay = document.getElementById('cart-count');

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            // အရေအတွက် တိုးမယ်
            cartCount++;
            cartDisplay.innerText = cartCount;

            // ဈေးနှုန်းကို တွက်ချက်မယ် (ရိုးရှင်းအောင် လုပ်ထားတာပါ)
            const priceText = button.parentElement.querySelector('.price').innerText;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));
            totalPrice += price;

            // အကြောင်းကြားစာပြမယ်
            alert(`ပစ္စည်းကို ဈေးခြင်းထဲ ထည့်ပြီးပါပြီ။ \nစုစုပေါင်း ကျသင့်ငွေ: ${totalPrice.toLocaleString()} ကျပ်`);
            
            // ခလုတ်အရောင် ခဏပြောင်းမယ်
            button.innerText = "ထည့်ပြီးပါပြီ";
            button.style.background = "#D4AF37";
            setTimeout(() => {
                button.innerText = "ဝယ်ယူရန်";
                button.style.background = "#5D4037";
            }, 1000);
        });
    });
</script>