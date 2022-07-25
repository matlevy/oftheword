<template>
  <div class="alphabet-map-view">
    <h3>The Alphabet</h3>
    <div class="notes">
      <p>
        At the heart of all Holy Scriptures, and langauge, is a tool often
        ignored: an alphabet.
      </p>
      <p>
        From a perspective of understanding such books, a full understanding of
        wording of a given scripture can only be gained by understanding the
        principal tools behind the writing of such books; and the application of
        such can be observed from Hebrew traditions, highlighting that each
        given letter is but a form of number representing a spiritual idea.
      </p>
      <p>
        With the exception of "a", one letter given on its own is but a glyph
        upon a page: a small drawing of a cogntative idea.
      </p>
      <p>
        Those within computer programming will also be familiar with such a
        system to represent numbers ouside of a base ten counting system.
      </p>
      <p>
        Very fundamemntaly, and to all applications of Holy Scriptures: to have
        a full understanding of ones Holy Scriptures, one must observe how the
        design of each given alphabet, within the language of the written text,
        is used to form cognates of words, and from such a given word, into a
        scripture.
      </p>
      <p>
        One must also understand, a given word written upon a page, is but a
        word; and only when taken in cognative form does it become a thought;
        and those of which are ones thoughts are divided from the reality from
        in which one is reading.
      </p>
      <p>
        From the perspective of scientific explanation, words can be represented
        in three forms: written word, spoken word, and cognative;
      </p>
      <p>
        The purpose of the alphabet, is to take those of which are aural, or
        cognative, and represent each given word in a written format; utilising
        cognates as foundations; and when understanding the abstract, or
        spiritual, structure of a written word, one can begin to implement a
        scientific knowledge of linguistics to unlock a more precise spiritual
        meaning.
      </p>
      <p>
        Further to this, given the principal foundations of human behaviour form
        the heartbeat of spiritual understanding, once understood in an abstract
        form, one can apply the same interprations of psychological
        understanding: the human mind and conciousness;
      </p>
      <p>
        To begin to observe a phenomenom of the Latin Alphabet, when applied to
        the text of the King James Bible, with an understanding of techniques
        widely discussed within Jewish faith.
      </p>
    </div>
    <div class="block-insert wide-vertical-space">
      <AlphaBetMap
        noColumnLabel
        noDivisions
        borderContainer
        :onlyColour="vowels"
        :inputH="demoA"
        :rowFilter="c"
        :highlight="vowels"
      ></AlphaBetMap>
    </div>
    <div class="notes">
      <p>
        Observing the above words, as one continous string, we can begin to see
        both patterns in the arrangment of letters, and, in consideration of the
        statement, a clear, and distinct structure to vowel patterns
        representative the cognative thought process.
      </p>
    </div>
    <div class="block-insert wide-vertical-space">
      <AlphaBetMap
        noColumnLabel
        noDivisions
        borderContainer
        :onlyColour="vowels"
        :inputH="vowels"
        :rowFilter="c"
        :highlight="vowels"
      ></AlphaBetMap>
    </div>
    <div class="notes">
      <p>
        To begin constructing the alphabet, a colour, and position is used to
        represent each vowel section: an abstract concept is then given to each
        vowel, as a root of all letters within its color collection:
        <b>[A]</b> as the root of conciousness; <b>[E]</b> as external, or
        existence; <b>[I]</b> as the eye of ones experience; <b>[O]</b> as
        points, and truths; and <b>U</b> as placement.
      </p>
      <p>
        A simple method to remember this is to think of the latin cognates
        <i>pra</i>, <i>pre</i>, <i>pri</i>, <i>pro</i>, <i>pru</i>; and if we
        consider latin words such as <i>ab</i> we begin to see how these
        cognates are formed.
      </p>
    </div>
    <div class="block-insert wide-vertical-space">
      <AlphaBetMap
        noColumnLabel
        noDivisions
        allowToggle
        borderContainer
        :rowFilter="c"
        :highlight="vowels"
      ></AlphaBetMap>
    </div>
    <div class="notes">
      <p>
        Each colour sectioning of the alphabet is then divided into simple steps
        of concious awareness, representative of the section: <b>[A]</b> to
        <b>[B]</b> to <b>[C]</b>: <i>at</i>, <i>begin</i>, <i>create</i>,
        <i>do</i>;
      </p>
      <p>
        An interesting point to note is: the letters <b>[IN THE]</b>, the
        opening words of The Bible, and English Quran, also divide the alphabet
        precisely in this fashion; and the letters <b>[IN]</b> can be used to
        represent the inner most of ones being: begginnging to open the door to
        understand that the opening line of The Bible, Torah, Quran, and many
        other Holy Scriptures have cleverly been designed to use the alphabet to
        describe a spritual, and concious, world only percievable within, and
        one's connection with such: utilising the alphabet to represent
        ones-self, and connection with such, and likewise with all written word;
      </p>
      <p>
        These techniques can be applied by any linguist, however what the
        alphabets of the Holy Scriptures then begin to do is describe the
        interconnectivity of these letters, spiritually, and within. Hebrew,
        Arabic, and Greek, all provide names for each letter; and the purpose of
        these is to describe interconnectivity of letters. Within Psalms 119 of
        the King James Bible is a similar mapping tool: utilising the Hebrew
        forms of letters.
      </p>
    </div>
    <div class="block-insert wide-vertical-space hebrew-mappings">
      <AlphaBetMap
        v-for="(map, index) in hebrewMappings"
        v-bind:key="index"
        :inputH="map"
        :rowFilter="c"
        class="hebrew-map"
        noColumnLabel
        noDivisions
        borderContainer
      ></AlphaBetMap>
    </div>
    <div class="notes">
      <p>
        To provide a practical example of how one may use these in every day
        life: one may have heard of the phrase "Elephant in the room", as a
        coloquiul term.
      </p>
      <p>
        An English speaking person will become familiar with these through life,
        however, taking note of "Aleph", and the similarity of spelling: what
        may be hard to percieve at first, without linguistical knowledge, is the
        person speaking creating a similar map of abstract representation of a
        cognative idea;
      </p>
      <p>
        The fact that the letters of <b>[ALEPH]</b>, and <b>[ELEPH]</b>, of
        Elephant, are similar in spelling represents this same cognative
        understanding; and to understand the cognative association, we reference
        with the abstract represenation of the alphabet, noting connections in
        triplets: <b>[EL]</b> to <b>[E]</b>, <b>[LE]</b> to <b>[P]</b>,
        <b>[PE]</b> to <b>[H]</b>;
      </p>
      <p>
        Whilst this may seem seruptitious to some, these techniques of study
        form the foundation of a long standing theory of linguistics, attempting
        to trace the origins of language:
        <a
          href="https://en.wikipedia.org/wiki/Proto-Indo-European_language"
          target="_new"
          >proto-indo-european langauge theory</a
        >
      </p>
      <p>
        William Jones, caused an academic sensation when he proposed the common
        ancestry of Sanskrit, Greek, and Latin in 1786, forming the foundations
        of such theory. The phenomenom of cognates of langauge appearing to
        create common patterns between unrelated languages.
      </p>
      <p>
        Further to this, with in depth research, one can understand that such a
        technique of creating an abstract alphabet, and words, is currently
        within
        <a
          href="https://www.youtube.com/watch?v=Pi5taR18uZ8&t=1862s"
          target="_new"
          >use of the american special forces</a
        >
        to train, and test linguistical skills.
      </p>
      <p>
        In placing these scientific foundations, I now begin to describe a
        linguistic phenomenom, observable within all Holy Scriptures, utilising
        the same techniques, yet, to frame a reference with in approach to
        scientific methods of study, noting the phenomenom, and the historical
        understanding of the creation of the King Jamse Bible.
      </p>
      <p>Please begin by observing the following grid:</p>
    </div>
    <div class="block-insert wide-vertical-space">
      <AlphaBetMap
        class="word"
        allowToggle
        :inputH="fruit"
        :rowFilter="abc"
      ></AlphaBetMap>
    </div>
    <div class="notes">
      <p>
        The scientific understanding of cognates within language can be likened
        to taking fruit from a tree of knowledge. The cognate <b>[COG]</b> acts
        like a cog in ones head: one puts the cog within, and gains fruit from
        the cognative action of doing so; and if one flows in a direction of [A]
        to [B] to [C] in the columns, a good cognative understanding can help
        one create a strong house of thought.
      </p>
      <p>
        This table was created using a very simple technique, touched on by
        instructions commonly given by a Jewish Rabbi to find the first of a
        word within the Torah: yet extended to ask the first occurance of a
        letter within the King James Bible, then taking the two preceeding
        letters;
      </p>
      <p>
        Likened to a spirit hovering over the face of ones water of truth,
        hovering over the letter will provide the index of such letter in the
        book of Genesis: please do check for oneself.
      </p>
    </div>
    <div class="block-insert wide-vertical-space">
      <AlphaBetMap
        class="word"
        allowToggle
        :rowFilter="vowels"
        :colFilter="vowels"
        :inputHSearchSource="c"
      ></AlphaBetMap>
    </div>
    <div class="notes">
      <p>
        The above table begins by demonstrating, in a fundemental manor,
        cognative thought process, within the language of English, can be mapped
        by vowel patterns; and by phenomenom to which I hold no given
        explanation: the third row, and column, positioned by the letter
        <b>[I]</b>, we have the primary cognate of the word <b>[ENGLISH]</b>.
      </p>
      <p>
        Considering row <b>[O]</b> as representative of a collection point of
        truth, when one places <b>[A]</b> and <b>[B]</b> of a truth together, we
        tend to use the word <b>[AND]</b>; and we often need a <b>[HAND]</b> in
        doing so;
      </p>
    </div>
    <div class="block-insert wide-vertical-space">
      <AlphaBetMap allowToggle :row-filter="vowels"></AlphaBetMap>
    </div>
    <div class="notes">
      <p>
        Expanding further, we can clearly begin to see letters of the word
        <b>[THOUGHT]</b> taking place in the upper right corner of our grid;
        reflecting the concept discussed in the opening writings;
      </p>
      <p>
        If we consider the letters of the alphabet forming an accronymn:
        <u>m</u>y <u>n</u>eeds <u>o</u>f <u>p</u>articular <u>q</u>uestion, when
        put into place (row <b>[U]</b>, representing things put into
        collection), will always <b>[SHAPE]</b> me as a person;
      </p>
    </div>
    <div class="block-insert wide-vertical-space">
      <AlphaBetMap allowToggle :row-filter="abc"></AlphaBetMap>
    </div>
    <div class="notes">
      <p>
        Maintaining <b>[C]</b> as a representation of where that which we see
        created, and the principle letter of the alphebet where we follow the
        expansion of the Hebrew Technique of first occurance; we see:
        <b>[EED]</b>, attaching to the seed of a thought, mapped within our root
        abstract section;
      </p>
    </div>
    <div class="block-insert wide-vertical-space">
      <AlphaBetMap allowToggle :row-filter="cde"></AlphaBetMap>
    </div>
    <div class="notes">
      <p>
        Considering <b>[D]</b> as that which where one puts into place, when
        cross-referenced, with Genesis 1:2, this places <b>[TER]</b> within
        <b>[WAS]</b>, creating <b>[WATERS]</b> connecting to
        <b>[THEEARTH]</b> of ones thoughts, in the opening words of the
        scripture;
      </p>
      <p>
        Viewing the second column, we see <b>[BOIE]</b>: replacing N with I,
        similar to <b>[BONE]</b>, where ones strength in truth will be placed
        into existence in the eye of truth;
      </p>
      <p>
        <b>[NAN]</b> is a connection point of letters between <b>[HEAVEN]</b>,
        and <b>[AND]</b>: placed under <b>[IJK]</b>, considered as an acronym as
        <u>j</u>udgement within the <u>eye</u> of <u>k</u>nowing;
      </p>
      <p>
        Finally, on row <b>[E]</b>, representing putting, or perception of
        existence: in our first section we see <b>[EGE]</b>, a cognate of
        <b>[KNOWLEDGE]</b>; and in the furthest right <b>[FNSH]</b>;
      </p>
    </div>
    <div class="block-insert wide-vertical-space">
      <AlphaBetMap
        class="word"
        allowToggle
        :row-filter="ils"
        :inputH="coincidence"
      ></AlphaBetMap>
    </div>
    <div class="notes">
      <p>
        I provide no explanation as to the cause of such phenomenom, yet, as
        such, it is clear from observation of a phenomenom, that within
        connection of the Holy Scripture, of all faiths, given the language
        refelected of such faith a possibility to connect the given language
        within an abstract, spiritual, cognative, or pysychologically related
        form, utilising the alphabet of the given language, and understanding of
        linguistical studies.
      </p>
      <p>
        A phenomenom first noted by those of Jewish faith, yet when placed
        within the context of differing languages, and although only
        demonstrated within the English language to date, repeatable with the
        same techniques: to recap;
      </p>
      <ul>
        <li>
          The given Alphabet is divided into sections to represent elements of
          ones spiritual self: although not demonstrated, the same divisions can
          be applied within any Latin based alphabet; and a similar principle
          applied to the Hebrew Alphabet, yet with a differing divisions due to
          the nature of the alphabet;
        </li>
        <li>
          The first occurance of the given letter is noted within the scriptures
          analysed, with the two preceeding letters, and the remaining count of
          the letters within the given alphabet;
        </li>
        <li>
          If the given alphabet provides phonetical spellings of letters, these
          are also utilised to build an understanding of the abstract
          connections of letters within the alphabet;
        </li>
      </ul>
      <div class="notes">
        <p>
          The fourth, and primary element of such technique, is an opening map
          of concious thought created using such tools, at which one is left to
          experiment with the analsed alphabet grid, or explore the opening
          verse of Genesis, to understand such fourth element.
        </p>
      </div>
      <button class="link-button" @click="goToGrid">
        Explore The Alphabet Grid
      </button>
    </div>
    <EncapsulationDecoratorVue></EncapsulationDecoratorVue>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import AlphaBetMap from "@/components/letter/AlphabetMap.vue";
import EncapsulationDecoratorVue from "@/components/reading/EncapsulationDecorator.vue";

@Options({
  name: "letter-view",
  components: {
    AlphaBetMap,
    EncapsulationDecoratorVue,
  },
})
export default class AlphabetView extends Vue {
  public demoA = "ATHENTHISTHOUGHTCAMEINTOMYHEAD";
  public vowels = "AEIOU";
  public abc = "ABC";
  public cde = "CDE";
  public ils = "CILS";
  public c = "C";
  public fruit = "FRUIT";
  public coincidence = "COINCIDENCE";
  public hebrewMappings: string[] = [
    "ALEPH",
    "BETH",
    "GIMEL",
    "DALETH",
    "HE",
    "VAU",
    "ZAIN",
    "CHETH",
    "TETH",
    "JOD",
    "CAPH",
    "LAMED",
    "MEM",
    "NUN",
    "SAMECH",
    "AIN",
    "PE",
    "TZADDI",
    "KOPH",
    "RESH",
    "SCHIN",
    "TAU",
  ];
  //
  public goToGrid() {
    this.$router.push({
      name: "alphabetgrid",
    });
  }
}
</script>
<style>
.notes {
  line-height: 2rem;
  max-width: 800px;
}
.alphabet-map-view {
  text-align: left;
  color: white;
  margin: 2rem;
  max-width: 1000px;
}
.block-insert {
  display: flex;
  width: 100%;
}
.wide-vertical-space {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.hebrew-mappings {
  display: flex;
  flex-direction: row;
  max-width: 800px;
  flex-wrap: wrap;
}
.hebrew-map {
  margin-right: 1rem;
  border: 1px dotted rgba(255, 255, 255, 0.2);
  margin-bottom: 0.5rem;
}
a {
  color: red;
  text-decoration: none;
}
ul {
  margin-bottom: 2rem;
}
li {
  margin-bottom: 1rem;
}
.link-button {
  background: transparent;
  padding: 1rem;
  border: 1px solid white;
  margin-bottom: 2rem;
  margin-top: 2rem;
  color: white;
  cursor: pointer;
}
</style>
