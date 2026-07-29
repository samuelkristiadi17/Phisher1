import pandas as pd                  # Data Analysis
import matplotlib.pyplot as plt      # Data Visualization
from collections import Counter      # Frequency Counting
import warnings                      # Warning Handling
from matplotlib.gridspec import GridSpec # Plot Layout

warnings.filterwarnings('ignore')    # Hide Warnings

# Lokasi file data kuesioner
FILE_PATH = "phishsim_respons.csv"

# Membaca data CSV
df = pd.read_csv(FILE_PATH)

# 13 kolom: A-M
df.columns = [
    'Timestamp', 'Q1_Checkbox', 'Q2_Familiar',
    'Q3_Warna', 'Q4_Layout', 'Q5_Yakin',
    'Q6_Meyakinkan', 'Q7_Overall',
    'Q8_Curiga', 'Q9_Elemen', 'Q10_Tertipu',
    'Email', 'Score'
]

# Drop kolom yang tidak dianalisis
df = df.drop(columns=['Q1_Checkbox', 'Email', 'Score'])

# Menampilkan informasi awal dataset
print("=" * 60)
print("PHISHSIM — LAPORAN ANALISIS DATA KUESIONER")
print("=" * 60)
print(f"\nTotal responden: {len(df)}")
print(f"Periode data: {df['Timestamp'].iloc[0]} — {df['Timestamp'].iloc[-1]}")

# Menentukan kolom dan label untuk analisis skala Likert
likert_cols = ['Q3_Warna', 'Q4_Layout', 'Q5_Yakin', 'Q6_Meyakinkan', 'Q7_Overall']
likert_labels = [
    'Kemiripan Warna',
    'Kemiripan Layout',
    'Keyakinan Visual',
    'Tingkat Meyakinkan',
    'Kemiripan Keseluruhan'
]

# Menampilkan analisis kemiripan visual
print("\n" + "─" * 60)
print("SECTION A — KEMIRIPAN VISUAL (Skala 1–5)")
print("─" * 60)

# Menghitung statistik deskriptif untuk setiap indikator Likert
stats = df[likert_cols].describe().T
stats.index = likert_labels
stats = stats[['mean', 'std', 'min', 'max']]
stats.columns = ['Rata-rata', 'Std Dev', 'Min', 'Max']
stats = stats.round(2)
print(stats.to_string())

# Menghitung rata-rata similarity score keseluruhan
overall_mean = df[likert_cols].mean().mean()
print(f"\n→ Rata-rata Similarity Score Keseluruhan: {overall_mean:.2f} / 5.00")

# Menampilkan analisis frekuensi penggunaan Pinterest
print("\n" + "─" * 60)
print("SECTION B — FREKUENSI PENGGUNAAN PINTEREST (Q2)")
print("─" * 60)

# Menghitung jumlah dan persentase setiap kategori penggunaan Pinterest
q2_counts = df['Q2_Familiar'].value_counts()
q2_pct = df['Q2_Familiar'].value_counts(normalize=True) * 100
q2_summary = pd.DataFrame({'Jumlah': q2_counts, 'Persentase (%)': q2_pct.round(1)})
print(q2_summary.to_string())

# Membandingkan similarity score berdasarkan tingkat familiaritas Pinterest
familiar_group = df[df['Q2_Familiar'] != 'Tidak pernah'][likert_cols].mean().mean()
not_familiar_group = df[df['Q2_Familiar'] == 'Tidak pernah'][likert_cols].mean().mean()
print(f"\n→ Rata-rata similarity (familiar Pinterest): {familiar_group:.2f} / 5.00")
print(f"→ Rata-rata similarity (tidak familiar): {not_familiar_group:.2f} / 5.00")

# Menampilkan analisis kesadaran phishing
print("\n" + "─" * 60)
print("SECTION C — KESADARAN PHISHING (Q8)")
print("─" * 60)

# Menghitung jumlah dan persentase tingkat kecurigaan responden
q8_counts = df['Q8_Curiga'].value_counts()
q8_pct = df['Q8_Curiga'].value_counts(normalize=True) * 100
q8_summary = pd.DataFrame({'Jumlah': q8_counts, 'Persentase (%)': q8_pct.round(1)})
print(q8_summary.to_string())

# Menampilkan analisis elemen yang dianggap mencurigakan
print("\n" + "─" * 60)
print("SECTION D — ELEMEN YANG MENCURIGAKAN (Q9)")
print("─" * 60)

# Mengumpulkan seluruh elemen mencurigakan dari setiap responden
all_elements = []
for response in df['Q9_Elemen'].dropna():
    elements = [e.strip() for e in response.split(',')]
    all_elements.extend(elements)

# Menghitung frekuensi setiap elemen dan persentasenya
element_counts = Counter(all_elements)
element_df = pd.DataFrame(element_counts.items(), columns=['Elemen', 'Jumlah'])
element_df = element_df.sort_values('Jumlah', ascending=False)
element_df['Persentase (%)'] = (element_df['Jumlah'] / len(df) * 100).round(1)
print(element_df.to_string(index=False))

# Menampilkan analisis potensi responden tertipu
print("\n" + "─" * 60)
print("SECTION E — POTENSI TERTIPU (Q10)")
print("─" * 60)

# Menghitung jumlah dan persentase jawaban Q10
q10_counts = df['Q10_Tertipu'].value_counts()
q10_pct = df['Q10_Tertipu'].value_counts(normalize=True) * 100
q10_summary = pd.DataFrame({'Jumlah': q10_counts, 'Persentase (%)': q10_pct.round(1)})
print(q10_summary.to_string())

# ─────────────────────────────────────────
# VISUALISASI
# ─────────────────────────────────────────

# Membuat canvas untuk lima grafik
fig = plt.figure(figsize=(20, 13))
fig.suptitle('PhishSim — Hasil Analisis Kuesioner Similarity Analyzer',
             fontsize=16, fontweight='bold', y=1.01)

# Menentukan warna yang digunakan pada grafik
colors_teal = '#1A5E57'
palette = ['#1A5E57', '#2E8B84', '#D0EBEA', '#F4A261', '#E76F51']

# Mengatur posisi dan ukuran setiap grafik
gs = GridSpec(2, 6, figure=fig, hspace=0.5, wspace=0.5)

# Membuat lima area grafik
ax1 = fig.add_subplot(gs[0, 0:2])
ax2 = fig.add_subplot(gs[0, 2:4])
ax3 = fig.add_subplot(gs[0, 4:6])
ax4 = fig.add_subplot(gs[1, 0:3])
ax5 = fig.add_subplot(gs[1, 3:6])

# Menyesuaikan posisi grafik bagian bawah
pos4 = ax4.get_position()
pos5 = ax5.get_position()
ax4.set_position([pos4.x0, pos4.y0, pos4.width * 0.88, pos4.height])
ax5.set_position([pos5.x0 + pos5.width * 0.12, pos5.y0, pos5.width * 0.88, pos5.height])

# Chart 1 — Bar chart tertinggi ke terendah
means = df[likert_cols].mean()
means_series = pd.Series(means.values, index=likert_labels)
means_sorted = means_series.sort_values(ascending=False)

bars = ax1.bar(means_sorted.index, means_sorted.values, color=colors_teal, edgecolor='white', linewidth=0.5)
ax1.set_ylim(0, 5)
ax1.set_title('Rata-rata Skor Kemiripan Visual', fontweight='bold')
ax1.set_ylabel('Skor')
ax1.tick_params(axis='x', rotation=25)

# Menambahkan nilai rata-rata di atas setiap batang
for bar, val in zip(bars, means_sorted.values):
    ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.05,
             f'{val:.2f}', ha='center', va='bottom', fontsize=10, fontweight='bold')

# Chart 2 — Pie Q2
q2_counts.plot(kind='pie', ax=ax2, autopct='%1.1f%%',
               colors=palette, startangle=90,
               textprops={'fontsize': 9})
ax2.set_title('Frekuensi Penggunaan Pinterest', fontweight='bold')
ax2.set_ylabel('')

# Chart 3 — Pie Q8
q8_colors = ['#E76F51', '#F4A261', '#1A5E57']
q8_counts.plot(kind='pie', ax=ax3, autopct='%1.1f%%',
               colors=q8_colors[:len(q8_counts)], startangle=90,
               textprops={'fontsize': 9})
ax3.set_title('Kesadaran Phishing Responden\nSebelum Diberitahu', fontweight='bold')
ax3.set_ylabel('')

# Chart 4 — Horizontal bar Q9
element_df_sorted = element_df.sort_values('Jumlah')
bars4 = ax4.barh(element_df_sorted['Elemen'], element_df_sorted['Jumlah'],
                  color=colors_teal, edgecolor='white')
ax4.set_title('Elemen Paling Mencurigakan', fontweight='bold')
ax4.set_xlabel('Jumlah Responden')

# Menambahkan jumlah responden pada setiap batang
for bar, val in zip(bars4, element_df_sorted['Jumlah']):
    ax4.text(bar.get_width() + 0.3, bar.get_y() + bar.get_height()/2,
             str(int(val)), va='center', fontsize=9)

# Chart 5 — Pie Q10
q10_colors = ['#1A5E57', '#F4A261', '#E76F51']
ax5.pie(q10_counts.values, labels=q10_counts.index,
        autopct='%1.1f%%', colors=q10_colors[:len(q10_counts)],
        startangle=90, textprops={'fontsize': 9},
        pctdistance=0.75, labeldistance=1.15)
ax5.set_title('Potensi Tertipu jika Tidak\nMengetahui Simulasi', fontweight='bold')

# Menyimpan seluruh visualisasi sebagai file PNG
plt.savefig('phishsim_analysis_charts.png', dpi=150, bbox_inches='tight')
print("\n→ Chart disimpan sebagai: phishsim_analysis_charts.png")


# Menampilkan lokasi hasil export
print("\n" + "=" * 60)
print("ANALISIS SELESAI")
print("=" * 60)
