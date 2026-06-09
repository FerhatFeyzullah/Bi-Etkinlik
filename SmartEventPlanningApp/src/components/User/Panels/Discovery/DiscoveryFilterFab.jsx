import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import DiscoveryFilterPanel from "./DiscoveryFilterPanel";

// Mobilde Keşfet'in sağ filtre paneli yerine geçen FAB + modal.
// İçinde AYNI DiscoveryFilterPanel render edilir → aynı state/aksiyonlar kullanılır,
// yeni filtre mantığı yazılmaz. Sadece sunum değişir.
function DiscoveryFilterFab() {
  const { t: tText } = useTranslation("text");
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <Fab
        color="primary"
        aria-label={tText("filterPanelTitle")}
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          right: 16,
          // Alt navigasyon barı (60px) ile çakışmasın
          bottom: "calc(60px + 16px)",
          // İçeriğin ve alt barın (1100) üstünde, dialog'un (1300) altında
          zIndex: 1200,
        }}
      >
        <FilterAltIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={close}
        keepMounted
        fullWidth
        maxWidth="xs"
        scroll="paper"
        sx={{
          // Paylaşılan panelin masaüstüne özel kurallarını modal içinde nötrle
          "& .discovery-filter-container": {
            height: "auto",
            width: "100%",
            borderLeft: "none",
          },
          "& .discovery-filter-lists-main": { height: "auto" },
          // Başlık DialogTitle'da var; panel içindeki tekrar eden başlığı gizle
          "& .discovery-filter-lists-main > h2": { display: "none" },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 1,
          }}
        >
          {tText("filterPanelTitle")}
          <IconButton aria-label="close" onClick={close}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {/* Portal açık (disablePortal=false) → dropdown/takvim modal içinde kırpılmadan açılır.
              onRequestClose → uygula/temizle sonrası modal otomatik kapanır. */}
          <DiscoveryFilterPanel onRequestClose={close} disablePortal={false} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DiscoveryFilterFab;
